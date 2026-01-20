import React, { Component } from 'react';
import { Receipt, Plus, Loader2, CheckCircle2 } from 'lucide-react';

interface EReceipt {
    id: string;
    title: string;
    amount: number;
    transaction_date: string;
    status: string;
    tag?: string;
}

interface State {
    receipts: EReceipt[];
    isLoading: boolean;
}

export class EReceiptBox extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            receipts: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ isLoading: true });
        try {
            const expensesRes = await fetch('http://localhost:5000/api/finance/expenses');
            const data = await expensesRes.json();
            this.setState({
                receipts: data.success ? data.data : [],
                isLoading: false
            });
        } catch (e) {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { receipts, isLoading } = this.state;
        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><Receipt size={24} className="text-amber-500" /> E-Receipts & Geotagging</h3>
                    <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                        <Plus size={16} /> Scan Bukti
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-slate-50 rounded-[40px] border border-slate-100">
                            <Loader2 size={40} className="text-amber-500 animate-spin mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sinkronisasi E-Receipts...</p>
                        </div>
                    ) : receipts.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-slate-50 rounded-[40px] border border-slate-100 text-slate-300">
                            <Receipt size={48} className="mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">Belum ada struk tercatat</p>
                        </div>
                    ) : (
                        receipts.map(rec => (
                            <div key={rec.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:shadow-lg transition-all relative group">
                                <div className="absolute top-4 right-4"><Receipt className="text-slate-200" size={40} /></div>
                                <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-tighter mb-4 inline-block">{rec.tag || 'EXPENSE'}</span>
                                <h4 className="text-lg font-black text-slate-800 leading-tight">{rec.title}</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest mb-6">{new Date(rec.transaction_date).toLocaleString()}</p>

                                <div className="space-y-4 pt-4 border-t border-slate-200">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-bold text-slate-500">Jumlah Bayar</p>
                                        <p className="text-lg font-black text-slate-900">Rp {rec.amount.toLocaleString()}</p>
                                    </div>
                                    <div className={`text-[10px] font-black p-2 rounded-xl flex items-center gap-2 ${rec.status === 'DONE' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <CheckCircle2 size={12} /> Status: {rec.status}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default EReceiptBox;
