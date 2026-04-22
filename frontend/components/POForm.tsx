/**
 * @file page.tsx
 * @copyright 2026 Rivindu Sanjula. All Rights Reserved.
 * @license Proprietary Commercial Software
 * * Prepared exclusively for Liyonta Tea.
 * This software is provided under a commercial agreement. The source code, 
 * database schemas, and proprietary business logic contained within this 
 * file are the confidential and proprietary information of Liyonta Tea 
 * and its authorized developers.
 * * Unauthorized copying, distribution, or modification of this codebase, 
 * via any medium, is strictly prohibited. This is closed-source software. 
 * No open-source license is granted.
 */

import React from 'react';
import { Plus, Trash2, CalendarDays, Clock3, Building, Hash, User, Leaf } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';

// NEW: Added customers and teaGrades to the interface
interface POFormProps {
    data: POData;
    onChange: (data: POData) => void;
    customers: string[];
    teaGrades: string[];
}

export const POForm = ({ data, onChange, customers, teaGrades }: POFormProps) => {
    const updateField = (field: keyof POData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addLineItem = () => {
        onChange({
            ...data,
            // Uses the first fetched tea grade as the default when adding a new row
            items: [...data.items, { id: uuidv4(), description: teaGrades[0] || '', qty: 5, price: 25.00 }]
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
                        <select
                            value={data.customerName}
                            onChange={(e) => updateField('customerName', e.target.value)}
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-8 focus:ring-tea-500/10 focus:border-tea-600 focus:bg-white outline-none transition-all text-tea-950 font-bold cursor-pointer appearance-none shadow-sm"
                        >
                            <option value="" disabled>Select a Customer</option>
                            {/* DYNAMIC MYSQL CUSTOMERS LOOP */}
                            {customers.map(customer => (
                                <option key={customer} value={customer}>{customer}</option>
                            ))}
                        </select>
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
                                    <option value="" disabled>Select the Product</option>
                                    {/* DYNAMIC MYSQL TEA GRADES LOOP */}
                                    {teaGrades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-1.5">
                                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
                                        Qty (kg)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={item.qty}
                                        onChange={(e) => updateLineItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 shadow-sm"
                                    />
                                </div>

                                <div className="flex-1 space-y-1.5">
                                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
                                        Unit Price
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-mono pointer-events-none group-focus-within:text-teal-600 transition-colors">
                                            Rs.
                                        </span>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.price}
                                            onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-semibold font-mono text-stone-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 shadow-sm placeholder:text-stone-300"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 md:mt-0 md:pt-6">
                                <div className="flex-1 md:flex-none text-right px-6 py-3.5 bg-tea-50 border border-tea-100/50 rounded-2xl">
                                    <span className="font-mono font-black text-tea-900 text-lg tracking-tighter">
                                        <sup className="font-semibold text-xs opacity-50 mr-1">Rs. </sup>
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
                <div className="mt-12 pt-8 border-t border-stone-100 flex justify-end">
                    <div className="bg-teal-950 px-8 py-6 rounded-3xl w-full md:w-80 shadow-xl shadow-teal-950/20 relative overflow-hidden group/sub transition-all hover:shadow-2xl">
                        <div className="absolute -right-6 -bottom-6 text-white/[0.03] transition-transform duration-700 group-hover/sub:scale-110 rotate-12">
                            <Leaf className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-1">
                            <p className="text-[10px] font-bold text-teal-300 uppercase tracking-[0.25em]">
                                Grand Total
                            </p>
                            <div className="flex items-baseline justify-between">
                                <span className="text-sm text-teal-200 font-medium">LKR</span>
                                <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
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