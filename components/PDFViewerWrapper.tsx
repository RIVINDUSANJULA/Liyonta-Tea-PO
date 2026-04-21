'use client';

import { usePDF } from '@react-pdf/renderer';
import { POPdfDocument } from './POPdfDocument';
import { POData } from '@/types';
import { useEffect } from 'react';

export default function PDFViewerWrapper({ data }: { data: POData }) {
    const [instance, updateInstance] = usePDF({ document: <POPdfDocument data={data} /> });

    useEffect(() => {
        updateInstance(<POPdfDocument data={data} />);
    }, [data, updateInstance]);

    if (instance.loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50/30">
                <div className="w-8 h-8 border-3 border-tea-200 border-t-tea-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs font-bold text-tea-800/40 uppercase tracking-[0.2em]">Steeping Preview...</p>
            </div>
        );
    }

    if (instance.error) {
        return (
            <div className="w-full h-full flex items-center justify-center text-red-500 text-xs font-bold px-8 text-center leading-relaxed">
                Failed to update tea preview.<br/>Please check your inputs.
            </div>
        );
    }

    return (
        <iframe 
            src={`${instance.url}#toolbar=0&navpanes=0&view=FitH`} 
            className="w-full h-full border-none"
            title="PDF Preview"
        />
    );
}