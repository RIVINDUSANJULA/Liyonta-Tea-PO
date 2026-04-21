'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { POPdfDocument } from '@/components/POPdfDocument';
import { POData } from '@/types';

interface Props {
    data: POData;
}

export default function PDFDownloadButton({ data }: Props) {
    return (
        <PDFDownloadLink
            document={<POPdfDocument data={data} />}
            fileName={`${data.invoiceNo || 'PO'}_LiyontaTea.pdf`}
            className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 px-6 py-3 rounded-xl font-extrabold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95"
        >
            {/* @ts-ignore */}
            {({ loading }) => (
                <>
                    <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                    {loading ? 'Preparing Document...' : 'Download PDF'}
                </>
            )}
        </PDFDownloadLink>
    );
}