import React from 'react';
import { Plus, Trash2, CalendarDays, Clock3, Building, Hash, DollarSign, Leaf } from 'lucide-react';
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
        <div className="space-y-6">

            {/* --- Metadata Card --- */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100/60 space-y-6">
                <div className="flex items-center gap-2 border-b border-emerald-50 pb-4">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                        <Building className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="text-lg font-bold text-emerald-950">Client Details</h2>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Customer Name</label>
                        <input
                            type="text"
                            value={data.customerName}
                            onChange={(e) => updateField('customerName', e.target.value)}
                            className="w-full px-4 py-3 bg-[#F8F6F0] border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-emerald-950 font-semibold placeholder:text-stone-400"
                            placeholder="e.g. Royal Tea Houses Ltd."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                            <Hash className="w-3 h-3" /> Invoice No.
                        </label>
                        <input
                            type="text"
                            value={data.invoiceNo}
                            onChange={(e) => updateField('invoiceNo', e.target.value)}
                            className="w-full px-4 py-3 bg-[#F8F6F0] border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-emerald-950 font-semibold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" /> Date
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => updateField('date', e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8F6F0] border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-emerald-950 font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                                <Clock3 className="w-3 h-3" /> Time
                            </label>
                            <input
                                type="time"
                                value={data.time}
                                onChange={(e) => updateField('time', e.target.value)}
                                className="w-full px-4 py-3 bg-[#F8F6F0] border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 focus:bg-white outline-none transition-all text-emerald-950 font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Line Items Card --- */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100/60">
                <div className="flex justify-between items-center border-b border-emerald-50 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <Leaf className="w-5 h-5 text-amber-600" />
                        </div>
                        <h2 className="text-lg font-bold text-emerald-950">Tea Selection</h2>
                    </div>
                    <button
                        onClick={addLineItem}
                        className="flex items-center text-sm bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors font-semibold shadow-md shadow-emerald-900/20 active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                </div>

                <div className="space-y-4">
                    {data.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-4 items-center bg-[#F8F6F0] p-4 rounded-2xl border border-stone-200 hover:border-emerald-300 transition-all duration-300 group">

                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">Grade</label>
                                <select
                                    value={item.description}
                                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-emerald-950 cursor-pointer"
                                >
                                    {TEA_GRADES.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                            </div>

                            <div className="w-full md:w-20 space-y-1">
                                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">Qty (kg)</label>
                                <input
                                    type="number" min="1" step="0.5"
                                    value={item.qty}
                                    onChange={(e) => updateLineItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-bold text-emerald-950"
                                />
                            </div>

                            <div className="w-full md:w-28 space-y-1 relative">
                                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">Price</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number" min="0" step="0.01"
                                        value={item.price.toFixed(2)}
                                        onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2.5 pl-8 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-mono font-bold text-emerald-950"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-2 md:mt-0 md:pt-5">
                                <div className="flex-1 md:flex-none text-right px-3 py-2 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                                    <span className="font-bold text-emerald-800 text-base tracking-tight">
                                        <sup className="font-semibold text-[10px] opacity-70 mr-0.5">$</sup>
                                        {(item.qty * item.price).toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeLineItem(item.id)}
                                    disabled={data.items.length === 1}
                                    className="p-2 text-stone-400 hover:text-red-500 disabled:opacity-20 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Summary --- */}
                <div className="mt-6 pt-6 border-t border-emerald-50 flex justify-end">
                    <div className="bg-emerald-950 px-6 py-4 rounded-2xl w-full md:w-auto min-w-[250px] shadow-lg shadow-emerald-900/20 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 text-emerald-800/50">
                            <Leaf className="w-20 h-20" />
                        </div>
                        <div className="relative z-10 flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Subtotal</span>
                            <span className="text-2xl font-black tracking-tight text-white">
                                <sup className="font-medium text-sm text-emerald-400 mr-1">$</sup>
                                {subtotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};