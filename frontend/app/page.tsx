'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Leaf, Sparkles, FileText, Database } from 'lucide-react';

import { POForm } from '@/components/POForm';
import { AdminDashboard } from '@/components/AdminDashboard'; // NEW IMPORT
import { POData } from '@/types';

const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), { ssr: false });
const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), { ssr: false });

export default function PurchaseOrderPage() {
  // --- TABS STATE ---
  const [activeTab, setActiveTab] = useState<'form' | 'admin'>('form');

  // --- DATA STATES ---
  const [poData, setPoData] = useState<POData>({
    customerName: '',
    invoiceNo: `TEA-INV-${new Date().getFullYear()}-001`,
    date: '',
    time: '',
    items: [{ id: uuidv4(), description: '', qty: 10, price: 15.00 }],
  });

  const [debouncedPoData, setDebouncedPoData] = useState<POData>(poData);
  const [dbCustomers, setDbCustomers] = useState<string[]>([]);
  const [dbTeaGrades, setDbTeaGrades] = useState<string[]>([]);

  // --- FETCH DATA ---
  const fetchReferenceData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reference-data');
      if (response.ok) {
        const data = await response.json();
        setDbCustomers(data.customers);
        setDbTeaGrades(data.teaGrades);

        // Initialize first item if empty
        if (data.teaGrades.length > 0 && poData.items[0].description === '') {
          setPoData(prev => ({
            ...prev,
            items: [{ ...prev.items[0], description: data.teaGrades[0] }]
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch database data:", error);
    }
  };

  useEffect(() => {
    fetchReferenceData();
  }, []);

  // --- PDF DEBOUNCE & CLOCK ---
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedPoData(poData), 1000);
    return () => clearTimeout(handler);
  }, [poData]);

  useEffect(() => {
    const now = new Date();
    setPoData((prev) => ({
      ...prev,
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    }));
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* --- PREMIUM HEADER --- */}
        <header className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-tea-950 via-tea-900 to-emerald-900 p-8 rounded-[2rem] shadow-2xl shadow-tea-900/40 border border-tea-800/50">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 text-tea-400/10 pointer-events-none transform rotate-12"><Leaf className="w-80 h-80" /></div>
          <div className="absolute bottom-0 left-1/4 -mb-16 text-emerald-400/5 pointer-events-none"><Sparkles className="w-64 h-64" /></div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-inner">
              <Image src="/logo.png" alt="Liyonta Tea Logo" width={60} height={60} className="object-contain filter drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Purchase <span className="text-tea-400 font-light italic">Order</span>
              </h1>
            </div>
          </div>

          <div className="relative z-10">
            {activeTab === 'form' && <PDFDownloadButton data={poData} />}
          </div>
        </header>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex gap-4 p-2 bg-white/60 backdrop-blur-sm border border-stone-200/60 rounded-2xl w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'form' ? 'bg-tea-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-100 hover:text-tea-900'}`}
          >
            <FileText className="w-4 h-4" /> Order Form
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'admin' ? 'bg-tea-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-100 hover:text-tea-900'}`}
          >
            <Database className="w-4 h-4" /> Database Admin
          </button>
        </div>

        {/* --- DYNAMIC WORKSPACE --- */}
        {activeTab === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[800px]">
            <div className="lg:col-span-8 overflow-y-auto pr-2 custom-scrollbar pb-8">
              <POForm data={poData} onChange={setPoData} customers={dbCustomers} teaGrades={dbTeaGrades} />
            </div>
            <div className="hidden lg:block lg:col-span-4 h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-200/60 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tea-600 to-ceylon-500 z-10"></div>
              <PDFViewerWrapper data={debouncedPoData} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-[calc(100vh-280px)]">
            <AdminDashboard
              customers={dbCustomers}
              teaGrades={dbTeaGrades}
              onRefresh={fetchReferenceData}
            />
          </div>
        )}

      </div>
    </main>
  );
}