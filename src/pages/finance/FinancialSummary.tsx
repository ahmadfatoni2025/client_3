import React, { Component } from 'react';
import { CreditCard, Plus, ArrowRight, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export class FinancialSummary extends Component {
    state = {
        vaStatus: [
            { bank: 'Bank Mandiri', vaNumber: '8872 0012 3456 7890', balance: 125000000, status: 'Aktif' },
            { bank: 'Bank BRI', vaNumber: '9921 0081 2233 4455', balance: 45000000, status: 'Aktif' }
        ]
    };

    render() {
        return (
            <div className="space-y-6 animate-in fade-in duration-700">
                <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 italic"><CreditCard size={24} className="text-blue-500" /> Virtual Account Integration</h3>
                        <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><Plus size={20} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {this.state.vaStatus.map((va, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 group hover:border-blue-200 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{va.bank}</p>
                                        <h4 className="text-lg font-black text-slate-900 mt-1">{va.vaNumber}</h4>
                                    </div>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black uppercase">{va.status}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400">Available Balance</p>
                                        <h5 className="text-xl font-black text-slate-800">Rp {va.balance.toLocaleString()}</h5>
                                    </div>
                                    <button className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 group-hover:scale-110 transition-all">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><RefreshCcw size={24} className="text-emerald-500" /> Rekonsiliasi Bank Otomatis</h3>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Terakhir: 30 menit lalu</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { desc: 'Setlement VA Mandiri - Batch #A22', amt: '+12,500,000', status: 'Matched', icon: <CheckCircle2 className="text-emerald-500" /> },
                            { desc: 'Belanja Bahan Baku (E-Receipt REC-001)', amt: '-4,500,000', status: 'Matched', icon: <CheckCircle2 className="text-emerald-500" /> },
                        ].map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    {r.icon}
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{r.desc}</p>
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{r.status}</span>
                                    </div>
                                </div>
                                <p className={`font-black text-sm ${r.amt.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{r.amt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default FinancialSummary;
