// src/components/POForm.tsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { POData } from '@/types';

interface POFormProps {
    data: POData;
    onChange: (data: POData) => void;
}

const TEA_GRADES = ["BOPF", "Pekoe", "OP", "Earl Grey", "Silver Tips", "FBOP", "Matcha Powder"];

export const POForm = ({ data, onChange }: POFormProps) => {
    const updateField = (field: keyof POData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addLineItem = () => {
        onChange({
            ...data,
            items: [...data.items, { id: uuidv4(), description: TEA_GRADES[0], qty: 1, price: 0 }]
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

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Purchase Details</h2>
                <p className="text-sm text-gray-500">Enter the enterprise details for this tea shipment.</p>
            </div>

            {/* Metadata Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Customer Company Name</label>
                    <input
                        type="text"
                        value={data.customerName}
                        onChange={(e) => updateField('customerName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        placeholder="e.g., Global Beverages Ltd"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Invoice No.</label>
                    <input
                        type="text"
                        value={data.invoiceNo}
                        onChange={(e) => updateField('invoiceNo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        placeholder="INV-2026-001"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        value={data.time}
                        onChange={(e) => updateField('time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                </div>
            </div>

            {/* Line Items */}
            <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Line Items</h3>
                    <button
                        onClick={addLineItem}
                        className="flex items-center text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition font-medium"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Product
                    </button>
                </div>

                <div className="space-y-3">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Tea Grade / Description</label>
                                <select
                                    value={item.description}
                                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500"
                                >
                                    {TEA_GRADES.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                </select>
                            </div>
                            <div className="w-24">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Qty (kg)</label>
                                <input
                                    type="number" min="1"
                                    value={item.qty}
                                    onChange={(e) => updateLineItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Price ($)</label>
                                <input
                                    type="number" min="0" step="0.01"
                                    value={item.price}
                                    onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div className="w-24 px-2 py-2 text-right">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Total</label>
                                <span className="font-semibold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => removeLineItem(item.id)}
                                disabled={data.items.length === 1}
                                className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 transition mb-1"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};