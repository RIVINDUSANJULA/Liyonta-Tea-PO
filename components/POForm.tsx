import React from 'react';
import { Plus, Trash2, CalendarDays, Clock3, Building, Hash, DollarSign, Leaf, User, ReceiptText, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';

interface POFormProps {
    data: POData;
    onChange: (data: POData) => void;
}

const TEA_GRADES = [
    "Silver Needle (White Tea)",
    "Da Hong Pao (Oolong)",
    "Matcha (Ceremonial Grade)",
    "Dragonwell (Green Tea)",
    "Earl Grey (Boutique Special)",
    "BOPF (Ceylon Premium)",
    "Pekoe (Ceylon Golden)",
    "Silver Tips",
    "English Breakfast",
    "Moroccan Mint"
];

export const POForm = ({ data, onChange }: POFormProps) => {
    const updateField = (field: keyof POData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addLineItem = () => {
        onChange({
            ...data,
            items: [...data.items, { id: uuidv4(), description: TEA_GRADES[0], qty: 5, price: 25.00 }]
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
        <div className="space-y-8 pb-12">

            {/* --- Metadata Card --- */}
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-tea-900/5 border border-tea-100/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tea-50/50 rounded-bl-[4rem] -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>

                <div className="flex items-center gap-3 border-b border-tea-50 pb-6 mb-8 relative z-10 transition-colors">
                    <div className="p-3 bg-tea-100/50 rounded-2xl text-tea-800 shadow-sm">
                        <Building className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-tea-950 tracking-tight">Order Identification</h2>
                        <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">Client & Document Details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 relative z-10">
                    <div className="space-y-2 group/input">
                        <label className="text-[10px] font-black text-tea-800/60 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <User className="w-3 h-3 text-tea-500" /> Customer / Company Name
                        </label>
                        <input
                            type="text"
                            value={data.customerName}
                            onChange={(e) => updateField('customerName', e.target.value)}
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-8 focus:ring-tea-500/10 focus:border-tea-600 focus:bg-white outline-none transition-all text-tea-950 font-bold placeholder:text-stone-300 placeholder:font-medium"
                            placeholder="e.g. Celestial Tea Wholesalers"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2 group/input">
                            <label className="text-[10px] font-black text-tea-800/60 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Hash className="w-3 h-3 text-tea-500" /> Invoice Number
                            </label>
                            <input
                                type="text"
                                value={data.invoiceNo}
                                onChange={(e) => updateField('invoiceNo', e.target.value)}
                                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-8 focus:ring-tea-500/10 focus:border-tea-600 focus:bg-white outline-none transition-all text-tea-950 font-mono font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-tea-800/60 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <CalendarDays className="w-3 h-3 text-tea-500" /> Date
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => updateField('date', e.target.value)}
                                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-8 focus:ring-tea-500/10 focus:border-tea-600 focus:bg-white outline-none transition-all text-tea-950 font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-tea-800/60 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Clock3 className="w-3 h-3 text-tea-500" /> Time
                            </label>
                            <input
                                type="time"
                                value={data.time}
                                onChange={(e) => updateField('time', e.target.value)}
                                className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-8 focus:ring-tea-500/10 focus:border-tea-600 focus:bg-white outline-none transition-all text-tea-950 font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Line Items Card --- */}
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-tea-900/5 border border-tea-100/40">
                <div className="flex justify-between items-center border-b border-tea-50 pb-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-ceylon-100/50 rounded-2xl text-ceylon-800 shadow-sm">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-tea-950 tracking-tight">Grade Selection</h2>
                            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider">Itemized Products</p>
                        </div>
                    </div>
                    <button
                        onClick={addLineItem}
                        className="group flex items-center text-sm bg-tea-950 text-white px-6 py-3 rounded-2xl hover:bg-tea-900 transition-all font-bold shadow-lg shadow-tea-950/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-1 group-hover:rotate-90 transition-transform duration-300" /> Add Product
                    </button>
                </div>

                <div className="space-y-6">
                    {data.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1.2fr,auto] gap-6 items-center bg-stone-50/50 p-6 rounded-[1.5rem] border border-stone-200/60 hover:shadow-lg hover:shadow-tea-900/5 hover:bg-white transition-all duration-500 animate-in fade-in slide-in-from-left-4">

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Grade / Description</label>
                                <select
                                    value={item.description}
                                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-tea-500/10 focus:border-tea-600 transition-all font-bold text-tea-950 cursor-pointer appearance-none shadow-sm"
                                >
                                    {TEA_GRADES.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1 text-center">Qty (kg)</label>
                                <input
                                    type="number" min="1" step="0.5"
                                    value={item.qty}
                                    onChange={(e) => updateLineItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm text-center outline-none focus:ring-4 focus:ring-tea-500/10 focus:border-tea-600 transition-all font-bold text-tea-950 shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Unit Price ($)</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number" min="0" step="0.01"
                                        value={item.price}
                                        onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-3.5 pl-10 bg-white border border-stone-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-tea-500/10 focus:border-tea-600 transition-all font-mono font-bold text-tea-950 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 md:mt-0 md:pt-6">
                                <div className="flex-1 md:flex-none text-right px-6 py-3.5 bg-tea-50 border border-tea-100/50 rounded-2xl">
                                    <span className="font-mono font-black text-tea-900 text-lg tracking-tighter">
                                        <sup className="font-semibold text-xs opacity-50 mr-1">$</sup>
                                        {(item.qty * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeLineItem(item.id)}
                                    disabled={data.items.length === 1}
                                    className="p-3 text-stone-300 hover:text-red-500 disabled:opacity-0 rounded-2xl hover:bg-red-50 transition-all active:scale-90"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Summary --- */}
                <div className="mt-12 pt-8 border-t border-tea-50 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4 text-stone-300">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Calculated in real-time</span>
                    </div>
                    <div className="bg-tea-950 px-8 py-6 rounded-[2rem] w-full md:w-auto min-w-[320px] shadow-2xl shadow-tea-950/40 relative overflow-hidden group/sub">
                        <div className="absolute -right-8 -bottom-8 text-white/5 transition-transform group-hover/sub:scale-110 duration-700">
                            <Leaf className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 flex flex-col items-end">
                            <div className="flex items-center justify-between w-full">
                                <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Grand Total</span>
                                <span className="text-3xl font-black tracking-tight text-white font-mono">
                                    <sup className="font-medium text-base text-tea-300 mr-1">$</sup>
                                    {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};