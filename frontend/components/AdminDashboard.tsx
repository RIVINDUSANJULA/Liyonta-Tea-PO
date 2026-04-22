/**
 * @file AdminDashboard.tsx
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

import React, { useState } from 'react';
import { Building, Plus, Trash2, Leaf } from 'lucide-react';

interface Props {
    customers: string[];
    teaGrades: string[];
    onRefresh: () => void;
}

export const AdminDashboard = ({ customers, teaGrades, onRefresh }: Props) => {
    const [newCustomer, setNewCustomer] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [error, setError] = useState('');

    const handleAdd = async (e: React.FormEvent, type: 'customers' | 'tea-grades', value: string, setter: (val: string) => void) => {
        e.preventDefault();
        if (!value.trim()) return;

        try {
            const response = await fetch(`http://localhost:5000/api/reference-data/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: value }),
            });

            if (response.ok) {
                setter('');
                setError('');
                onRefresh(); // Trigger parent to fetch new data
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to reach server.');
        }
    };

    const handleDelete = async (type: 'customers' | 'tea-grades', name: string) => {
        if (!confirm(`Delete "${name}"?`)) return;
        try {
            const response = await fetch(`http://localhost:5000/api/reference-data/${type}/${encodeURIComponent(name)}`, {
                method: 'DELETE',
            });
            if (response.ok) onRefresh();
        } catch (err) {
            setError('Failed to delete item.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-200/60 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-black text-tea-950 mb-2">Database Management</h2>
            <p className="text-stone-500 mb-8 font-medium">Add or remove items. Changes will instantly reflect in the Purchase Order form.</p>

            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold">{error}</div>}

            <div className="grid md:grid-cols-2 gap-12">
                {/* Customers Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                        <Building className="w-5 h-5 text-tea-600" />
                        <h3 className="text-lg font-bold text-tea-900">Customers</h3>
                    </div>

                    <form onSubmit={(e) => handleAdd(e, 'customers', newCustomer, setNewCustomer)} className="flex gap-2">
                        <input
                            type="text"
                            value={newCustomer}
                            onChange={(e) => setNewCustomer(e.target.value)}
                            placeholder="New Company Name..."
                            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-tea-500/10 focus:border-tea-600 outline-none font-bold text-sm"
                        />
                        <button type="submit" disabled={!newCustomer.trim()} className="bg-tea-900 text-white px-4 py-3 rounded-xl hover:bg-tea-800 disabled:opacity-50 transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>

                    <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {customers.map(c => (
                            <li key={c} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-100 group">
                                <span className="font-semibold text-stone-700 text-sm">{c}</span>
                                <button onClick={() => handleDelete('customers', c)} className="text-stone-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tea Grades Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-bold text-tea-900">Tea Grades</h3>
                    </div>

                    <form onSubmit={(e) => handleAdd(e, 'tea-grades', newGrade, setNewGrade)} className="flex gap-2">
                        <input
                            type="text"
                            value={newGrade}
                            onChange={(e) => setNewGrade(e.target.value)}
                            placeholder="New Tea Grade..."
                            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none font-bold text-sm"
                        />
                        <button type="submit" disabled={!newGrade.trim()} className="bg-emerald-700 text-white px-4 py-3 rounded-xl hover:bg-emerald-800 disabled:opacity-50 transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>

                    <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {teaGrades.map(g => (
                            <li key={g} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-100 group">
                                <span className="font-semibold text-stone-700 text-sm">{g}</span>
                                <button onClick={() => handleDelete('tea-grades', g)} className="text-stone-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};