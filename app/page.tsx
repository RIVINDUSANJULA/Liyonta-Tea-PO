// src/app/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';
import { POForm } from '@/components/POForm';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { POPdfDocument } from '@/components/POPdfDocument';

// Dynamically import the viewer to prevent Next.js SSR hydration errors with browser APIs
const PDFViewerWrapper = dynamic(() => import('@/components/PDFViewerWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
      <p className="text-emerald-700 animate-pulse font-medium">Initializing Document Preview...</p>
    </div>
  ),
});

export default function PurchaseOrderPage() {
  const [poData, setPoData] = useState<POData>({
    customerName: '',
    invoiceNo: `INV-${new Date().getFullYear()}-001`,
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    items: [
      { id: uuidv4(), description: 'BOPF', qty: 100, price: 4.50 }
    ],
    taxRate: 0,
  });

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-800 p-6 rounded-2xl shadow-md text-white">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Purchase Order Generator</h1>
            <p className="text-emerald-200 text-sm mt-1">Liyonta Tea Internal Operations Portal</p>
          </div>

          {/* Download Button Component directly linked to the PDF Generator */}
          <PDFDownloadLink
            document={<POPdfDocument data={poData} />}
            fileName={`${poData.invoiceNo || 'PO'}_LiyontaTea.pdf`}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 px-5 py-2.5 rounded-lg font-semibold transition shadow-sm"
          >
            {/* @ts-ignore - react-pdf types sometimes clash with React 18 children typing */}
            {({ loading }) => (
              <>
                <Download className="w-5 h-5" />
                {loading ? 'Preparing PDF...' : 'Download PDF'}
              </>
            )}
          </PDFDownloadLink>
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