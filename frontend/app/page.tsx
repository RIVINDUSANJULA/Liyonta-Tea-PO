/**
 * @file page.tsx
 * @copyright 2026 Rivindu Sanjula. All Rights Reserved.
 * @license Proprietary Commercial Software
 * * Prepared exclusively for Liyonta Tea.
 * This software is provided under a commercial agreement. The source code, 
 * database schemas, and proprietary business logic contained within this 
 * file are the confidential and proprietary information of Liyonta Tea 
 * and its authorized developers.
 * * Unauthorized copying, distribution, or modification of this codebase, 
 * via any medium, is strictly prohibited. This is closed-source software. 
 * No open-source license is granted.
 */

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Leaf, Sparkles, FileText, Database } from 'lucide-react';

import { POForm } from '@/components/POForm';
import { AdminDashboard } from '@/components/AdminDashboard';
import { POData } from '@/types';

const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), { ssr: false });
const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), { ssr: false });

// --- CUSTOM SVG BRAND ICONS ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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

        {/* --- DEVELOPER FOOTER --- */}
        <footer className="mt-8 border-t border-stone-200/60 pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">© {new Date().getFullYear()} Liyonta Tea</span>
            <span> by <span className="font-bold text-tea-900">Rivindu Sanjula</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/RIVINDUSANJULA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-stone-100 rounded-lg hover:bg-tea-100 hover:text-tea-800 transition-all active:scale-95"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/rivindusanjula/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-stone-100 rounded-lg hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-all active:scale-95"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}