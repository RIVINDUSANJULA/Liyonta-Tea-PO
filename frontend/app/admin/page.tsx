'use client';

import { useState, useEffect } from 'react';
import { Building, Plus, Trash2, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [customers, setCustomers] = useState<string[]>([]);
    const [newCustomer, setNewCustomer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch existing customers on load
    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/reference-data');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            }
        } catch (err) {
            setError('Failed to connect to the database.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Handle Adding a Customer
    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCustomer.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/reference-data/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCustomer }),
            });

            if (response.ok) {
                setNewCustomer('');
                setError('');
                fetchCustomers(); // Refresh the list
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to add customer');
            }
        } catch (err) {
            setError('Failed to reach the server.');
        }
    };

    // Handle Deleting a Customer
    const handleDeleteCustomer = async (customerName: string) => {
        if (!confirm(`Are you sure you want to delete "${customerName}"?`)) return;

        try {
            const response = await fetch(`http://localhost:5000/api/reference-data/customers/${encodeURIComponent(customerName)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCustomers(); // Refresh the list
            } else {
                setError('Failed to delete customer');
            }
        } catch (err) {
            setError('Failed to reach the server.');
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-stone-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100/50 text-emerald-800 rounded-2xl">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-tea-950">Database Admin</h1>
                            <p className="text-stone-500 text-sm font-semibold">Manage Reference Data</p>
                        </div>
                    </div>
                    <Link href="/" className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all text-sm">
                        ← Back to PO Form
                    </Link>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Add Customer Form */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-tea-900/5 border border-tea-100/40 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <Building className="w-5 h-5 text-tea-600" />
                            <h2 className="text-xl font-bold text-tea-950">Add New Customer</h2>
                        </div>

                        <form onSubmit={handleAddCustomer} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={newCustomer}
                                    onChange={(e) => setNewCustomer(e.target.value)}
                                    placeholder="e.g. Twinings of London"
                                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-tea-500/10 focus:border-tea-600 outline-none transition-all font-bold text-tea-950"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-semibold px-2">{error}</p>}

                            <button
                                type="submit"
                                disabled={!newCustomer.trim()}
                                className="w-full flex items-center justify-center gap-2 bg-tea-900 hover:bg-tea-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]"
                            >
                                <Plus className="w-5 h-5" /> Add Customer to Database
                            </button>
                        </form>
                    </div>

                    {/* Customer List */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-tea-900/5 border border-tea-100/40">
                        <h2 className="text-xl font-bold text-tea-950 mb-6 border-b border-stone-100 pb-4">
                            Current Customers ({customers.length})
                        </h2>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12 text-stone-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                <p className="text-sm font-bold tracking-widest uppercase">Loading Database...</p>
                            </div>
                        ) : (
                            <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {customers.map((customer) => (
                                    <li
                                        key={customer}
                                        className="flex justify-between items-center bg-stone-50 hover:bg-white p-4 rounded-2xl border border-stone-200 hover:border-tea-200 transition-colors group"
                                    >
                                        <span className="font-bold text-stone-700">{customer}</span>
                                        <button
                                            onClick={() => handleDeleteCustomer(customer)}
                                            className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete Customer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </li>
                                ))}
                                {customers.length === 0 && (
                                    <p className="text-center text-stone-400 font-medium py-8">No customers found in database.</p>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}