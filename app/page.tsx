'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Leaf, FileText, Sparkles } from 'lucide-react';

import { POForm } from '@/components/POForm';
import { POData } from '@/types';

// Dynamically import BOTH PDF components to completely avoid SSR crashes
const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F6F0] rounded-3xl border border-emerald-100">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin mb-4"></div>
      <p className="text-emerald-800 font-semibold tracking-wide">Steeping Preview...</p>
    </div>
  ),
});

const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <button disabled className="bg-emerald-800/50 text-emerald-200 px-6 py-3 rounded-xl font-bold animate-pulse">
      Warming up...
    </button>
  )
});

export default function PurchaseOrderPage() {
  const [poData, setPoData] = useState<POData>({
    customerName: '',
    invoiceNo: `TEA-INV-${new Date().getFullYear()}-001`,
    date: '',
    time: '',
    items: [
      { id: uuidv4(), description: 'Silver Needle', qty: 10, price: 15.00 }
    ],
    taxRate: 0,
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    setPoData((prev) => ({
      ...prev,
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`
    }));
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* --- Premium Tea Header --- */}
        <header className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-tea-950 via-tea-900 to-emerald-900 p-8 rounded-[2rem] shadow-2xl shadow-tea-900/40 border border-tea-800/50">
          
          {/* Decorative Background Patterns */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 text-tea-400/10 pointer-events-none transform rotate-12">
             <Leaf className="w-80 h-80" />
          </div>
          <div className="absolute bottom-0 left-1/4 -mb-16 text-emerald-400/5 pointer-events-none">
             <Sparkles className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-inner">
                <Image 
                    src="/logo.png" 
                    alt="Liyonta Tea Logo" 
                    width={60} 
                    height={60} 
                    className="object-contain filter drop-shadow-lg"
                />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-tea-400/20 text-tea-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded border border-tea-400/30">
                        Enterprise Portal
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    Purchase <span className="text-tea-400 font-light italic">Order</span>
                </h1>
                <p className="text-tea-200/60 text-sm mt-1 font-medium tracking-wide flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Professional Document Generation System
                </p>
            </div>
          </div>

          <div className="relative z-10">
            <PDFDownloadButton data={poData} />
          </div>
        </header>

        {/* --- Workspace Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-240px)] min-h-[800px]">
          {/* Left Column: Form Editor */}
          <div className="lg:col-span-5 overflow-y-auto pr-2 custom-scrollbar pb-8">
            <POForm data={poData} onChange={setPoData} />
          </div>

          {/* Right Column: PDF Preview */}
          <div className="hidden lg:block lg:col-span-7 h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-200/60 overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tea-600 to-ceylon-500 z-10"></div>
            <PDFViewerWrapper data={poData} />
          </div>
        </div>

      </div>
    </main>
  );
}