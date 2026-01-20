import React, { Component } from 'react';
import { FileText, Plus, X, Loader2 } from 'lucide-react';

interface RABItem {
    id: string;
    title: string;
    amount: number;
    description?: string;
    category?: string;
}

interface State {
    rabItems: RABItem[];
    isLoading: boolean;
    isAddingRAB: boolean;
}

export class RABGenerator extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            rabItems: [],
            isLoading: false,
            isAddingRAB: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ isLoading: true });
        try {
            const budgetsRes = await fetch('http://localhost:5000/api/finance/budgets');
            const data = await budgetsRes.json();
            this.setState({
                rabItems: data.success ? data.data : [],
                isLoading: false
            });
        } catch (e) {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { rabItems, isLoading, isAddingRAB } = this.state;
        const totalRAB = rabItems.reduce((acc, curr) => acc + (curr.amount || 0), 0);

        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Rencana Anggaran Belanja (RAB)</h3>
                    <button onClick={() => this.setState({ isAddingRAB: true })} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                        <Plus size={16} /> Item Baru
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center">
                            <Loader2 size={40} className="text-slate-900 animate-spin mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Memuat RAB...</p>
                        </div>
                    ) : rabItems.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                            <FileText size={48} className="mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">Belum ada item RAB</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 text-left">
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Komoditas</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Anggaran</th>
                                    <th className="pb-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rabItems.map(item => (
                                    <tr key={item.id} className="group hover:bg-slate-50 transition-all">
                                        <td className="py-6">
                                            <p className="font-bold text-slate-800">{item.title}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{item.description}</p>
                                        </td>
                                        <td className="py-6 text-right font-black text-blue-600">Rp {item.amount.toLocaleString()}</td>
                                        <td className="py-6 text-right">
                                            <button className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-slate-900 text-white">
                                    <td className="px-6 py-6 rounded-l-[24px] font-black uppercase tracking-widest text-xs">Total Anggaran Proyeksi</td>
                                    <td className="px-6 py-6 text-right font-black text-xl">Rp {totalRAB.toLocaleString()}</td>
                                    <td className="rounded-r-[24px]"></td>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default RABGenerator;
