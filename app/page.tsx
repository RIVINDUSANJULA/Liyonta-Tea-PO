'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { Download, Leaf } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Assuming you have these components/types in your project
import { POForm } from '@/components/POForm';
import { POPdfDocument } from '@/components/POPdfDocument';
import { POData } from '@/types';

const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50/50 rounded-3xl border border-stone-200/50 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-4"></div>
      <p className="text-emerald-800 font-medium tracking-wide">Initializing Preview...</p>
    </div>
  ),
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
    <main className="min-h-screen bg-[#FDFBF7] p-4 md:p-6 lg:p-8 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* --- Premium Header --- */}
        <header className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-emerald-950 p-8 rounded-3xl shadow-2xl shadow-emerald-900/20 text-white border border-emerald-800/50">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 text-emerald-800/30">
            <Leaf className="w-64 h-64 rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-500/30">
                Internal Operations
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-50">
              Liyonta <span className="text-emerald-400 font-light">Tea</span>
            </h1>
            <p className="text-emerald-200/80 text-sm mt-2 font-medium tracking-wide">
              Purchase Order Generator & Preview
            </p>
          </div>

          <PDFDownloadLink
            document={<POPdfDocument data={poData} />}
            fileName={`${poData.invoiceNo || 'PO'}_LiyontaTea.pdf`}
            className="relative z-10 group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95"
          >
            {/* @ts-ignore */}
            {({ loading }) => (
              <>
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                {loading ? 'Preparing Document...' : 'Download PDF'}
              </>
            )}
          </PDFDownloadLink>
        </header>

        {/* --- Split Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-240px)] min-h-[800px]">
          {/* Left Column: Form Editor (Takes up 5 columns on large screens) */}
          <div className="lg:col-span-5 overflow-y-auto pr-2 custom-scrollbar pb-8">
            <POForm data={poData} onChange={setPoData} />
          </div>

          {/* Right Column: PDF Preview (Takes up 7 columns on large screens) */}
          <div className="hidden lg:block lg:col-span-7 h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-200 overflow-hidden">
            <PDFViewerWrapper data={poData} />
          </div>
        </div>

      </div>
    </main>
  );
}