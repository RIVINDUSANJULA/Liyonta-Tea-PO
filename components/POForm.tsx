import React from 'react';
import { Plus, Trash2, CalendarDays, Clock3, Building, Target, DollarSign, Leaf } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';

interface POFormProps {
    data: POData;
    onChange: (data: POData) => void;
}

const TEA_GRADES = [
    "Silver Needle",
    "Da Hong Pao Oolong",
    "Japanese Ceremonial Matcha",
    "Dragonwell (Longjing)",
    "Earl Grey (Boutique Blend)",
    "Pekoe (Ceylon)",
    "Moroccan Mint"
];

export const POForm = ({ data, onChange }: POFormProps) => {
    const updateField = (field: keyof POData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addLineItem = () => {
        onChange({
            ...data,
            items: [...data.items, { id: uuidv4(), description: TEA_GRADES[0], qty: 1, price: 15.00 }]
        });
    };

    const removeLineItem = (id: string) => {
        onChange({
            ...data,
            items: data.items.filter(item => item.id !== id)
        });
    };

    const updateLineItem = (id: string, field: string, value: string | number) => {
        onChange({
            ...data,
            items: data.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        });
    };

    const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 space-y-8">

            {/* --- Metadata Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-emerald-600" />
                        Customer Company Name
                    </label>
                    <input
                        type="text"
                        value={data.customerName}
                        onChange={(e) => updateField('customerName', e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-stone-800 font-medium placeholder:text-stone-300"
                        placeholder="e.g., Celestial Tea Houses Ltd"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-emerald-600" />
                        Invoice / Order No.
                    </label>
                    <input
                        type="text"
                        value={data.invoiceNo}
                        onChange={(e) => updateField('invoiceNo', e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-stone-800 font-medium placeholder:text-stone-300"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => updateField('date', e.target.value)}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-stone-800 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                            <Clock3 className="w-3.5 h-3.5 text-emerald-600" />
                            Time
                        </label>
                        <input
                            type="time"
                            value={data.time}
                            onChange={(e) => updateField('time', e.target.value)}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-stone-800 font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* --- Line Items Section --- */}
            <div className="pt-8 border-t border-stone-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                            Tea Selection
                        </h3>
                        <p className="text-sm text-stone-500 mt-1">Configure varieties, quantities, and pricing.</p>
                    </div>
                    <button
                        onClick={addLineItem}
                        className="flex items-center text-sm bg-stone-900 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-md active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-1.5" /> Add Item
                    </button>
                </div>

                <div className="space-y-4">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-4 items-center bg-stone-50/50 p-4 rounded-2xl border border-stone-200/60 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">

                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider ml-1">Grade</label>
                                <select
                                    value={item.description}
                                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-semibold text-stone-700 cursor-pointer"
                                >
                                    {TEA_GRADES.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                            </div>

                            <div className="w-full md:w-24 space-y-1.5">
                                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider ml-1">Qty (kg)</label>
                                <input
                                    type="number" min="1" step="0.5"
                                    value={item.qty}
                                    onChange={(e) => updateLineItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-semibold text-stone-700"
                                />
                            </div>

                            <div className="w-full md:w-32 space-y-1.5 relative">
                                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider ml-1">Price</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number" min="0" step="0.01"
                                        value={item.price.toFixed(2)}
                                        onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2.5 pl-9 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono font-semibold text-stone-700"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 md:mt-0 md:pt-6">
                                <div className="flex-1 md:flex-none text-right px-4 py-2.5 bg-amber-50/50 border border-amber-100 rounded-lg">
                                    <span className="font-bold text-amber-900 text-lg tracking-tight">
                                        <sup className="font-semibold text-xs opacity-60 mr-0.5">$</sup>
                                        {(item.qty * item.price).toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeLineItem(item.id)}
                                    disabled={data.items.length === 1}
                                    className="p-2.5 text-stone-400 hover:text-red-600 disabled:opacity-30 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Summary --- */}
                <div className="mt-6 flex flex-col items-end pt-6 border-t border-stone-100">
                    <div className="bg-stone-50 px-6 py-4 rounded-2xl border border-stone-200 min-w-[280px]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">Subtotal</span>
                            <span className="text-2xl font-black tracking-tight text-emerald-950">
                                <sup className="font-semibold text-sm opacity-60 mr-1">$</sup>
                                {subtotal.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[11px] text-stone-400 text-right">Taxes applied on final document.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};