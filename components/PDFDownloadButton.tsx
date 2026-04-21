'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { POPdfDocument } from './POPdfDocument';
import { POData } from '@/types';

export default function PDFDownloadButton({ data }: { data: POData }) {
    return (
        <PDFDownloadLink
            document={<POPdfDocument data={data} />}
            fileName={`${data.invoiceNo || 'PO'}_LiyontaTea.pdf`}
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
    );
}