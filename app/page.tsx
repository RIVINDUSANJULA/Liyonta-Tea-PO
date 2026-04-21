// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';
import { POForm } from '@/components/POForm';
import { Download } from 'lucide-react'; // Kept for the loading state

// 1. Dynamically import the Viewer (Existing)
const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
      <p className="text-emerald-700 animate-pulse font-medium">Initializing Document Preview...</p>
    </div>
  ),
});

// 2. NEW: Dynamically import the Download Button
const PDFDownloadButtonWrapper = dynamic(() => import('@/components/PDFDownloadButton'), {
  ssr: false,
  loading: () => (
    <button disabled className="flex items-center gap-2 bg-gray-300 text-gray-500 px-5 py-2.5 rounded-lg font-semibold cursor-not-allowed shadow-sm">
      <Download className="w-5 h-5" />
      Loading...
    </button>
  ),
});

export default function PurchaseOrderPage() {
  const [poData, setPoData] = useState<POData>({
    customerName: '',
    invoiceNo: `INV-${new Date().getFullYear()}-001`,
    date: '',
    time: '',
    items: [
      { id: uuidv4(), description: 'BOPF', qty: 100, price: 4.50 }
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
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-800 p-6 rounded-2xl shadow-md text-white">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Purchase Order Generator</h1>
            <p className="text-emerald-200 text-sm mt-1">Liyonta Tea Internal Operations Portal</p>
          </div>

          {/* 3. Use the dynamically imported wrapper instead of the direct link */}
          <PDFDownloadButtonWrapper data={poData} />
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[800px]">
          {/* Left Column: Editor */}
          <div className="overflow-y-auto pr-2 custom-scrollbar">
            <POForm data={poData} onChange={setPoData} />
          </div>

          {/* Right Column: Real-Time Preview */}
          <div className="h-full hidden lg:block">
            <PDFViewerWrapper data={poData} />
          </div>
        </div>

      </div>
    </main>
  );
}