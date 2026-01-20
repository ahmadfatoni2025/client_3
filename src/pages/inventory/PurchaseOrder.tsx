import { Component } from 'react';
import { FileText, Download, Plus, Loader2, Send, Clock, CheckCircle2 } from 'lucide-react';

interface PurchaseOrder {
    id: string;
    vendor_id: string;
    date: string;
    total_amount: number;
    status: string;
    vendors?: {
        name: string;
    }
}

interface State {
    pos: PurchaseOrder[];
    isLoading: boolean;
}

export class PurchaseOrderComponent extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pos: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchPOs();
    }

    fetchPOs = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch('http://localhost:5000/api/procurements');
            const result = await response.json();
            if (result.success) {
                this.setState({ pos: result.data, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Purchase Order (PO) Digital</h1>
                        <p className="text-sm font-medium text-slate-400">Pusat manajemen pengadaan barang dan sinkronisasi backend.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all flex items-center gap-2">
                        <Plus size={16} /> Create Digital PO
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending PO</p>
                            <p className="text-2xl font-black text-slate-800">03</p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Approved PO</p>
                            <p className="text-2xl font-black text-slate-800">12</p>
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                            <Send size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sent to Vendor</p>
                            <p className="text-2xl font-black text-slate-800">08</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">Recent PO Transactions</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">Total: {this.state.pos.length}</span>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {this.state.isLoading ? (
                            <div className="p-20 flex flex-col items-center justify-center">
                                <Loader2 size={40} className="text-rose-500 animate-spin mb-4" />
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Syncing with Cloud...</p>
                            </div>
                        ) : this.state.pos.length === 0 ? (
                            <div className="p-20 flex flex-col items-center justify-center text-slate-300">
                                <FileText size={48} className="mb-4" />
                                <p className="text-xs font-black uppercase tracking-widest">No PO Records Found</p>
                            </div>
                        ) : (
                            this.state.pos.map((po) => (
                                <div key={po.id} className="p-8 hover:bg-slate-50/50 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-white group-hover:border-rose-500 group-hover:text-rose-500 transition-all shadow-sm">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-lg uppercase">{po.id.slice(0, 12)}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{po.vendors?.name || 'Unknown Vendor'} • {new Date(po.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="text-right">
                                            <p className="text-[11px] font-black text-slate-400 uppercase mb-0.5 tracking-widest">Total Value</p>
                                            <p className="text-xl font-black text-emerald-600 tracking-tight text-right">Rp {po.total_amount?.toLocaleString() || 0}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${po.status === 'Selesai' || po.status === 'DONE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                po.status === 'Pending' || po.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse' :
                                                    'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}>
                                                {po.status}
                                            </span>
                                        </div>
                                        <button className="p-3 text-slate-300 hover:text-emerald-500 transition-colors bg-slate-50 rounded-xl hover:bg-emerald-50">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchaseOrderComponent;
