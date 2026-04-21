'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { POPdfDocument } from './POPdfDocument';
import { POData } from '@/types';

export default function PDFViewerWrapper({ data }: { data: POData }) {
    return (
        <PDFViewer className="w-full h-full rounded-xl border border-gray-200 shadow-sm">
            <POPdfDocument data={data} />
        </PDFViewer>
    );
}