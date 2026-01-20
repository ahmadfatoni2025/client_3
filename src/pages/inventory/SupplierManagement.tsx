import { Component } from 'react';
import { Store, Plus, MapPin, Phone, Loader2, TrendingUp, BarChart, Trash2 } from 'lucide-react';

interface Vendor {
    id: string;
    name: string;
    type: string;
    performance: number;
    category: string;
    location: string;
    phone: string;
}

interface State {
    vendors: Vendor[];
    isLoading: boolean;
}

export class SupplierManagement extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            vendors: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchVendors();
    }

    fetchVendors = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch('http://localhost:5000/api/vendors');
            const result = await response.json();
            if (result.success) {
                this.setState({ vendors: result.data, isLoading: false });
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            this.setState({ isLoading: false });
        }
    };

    handleDelete = async (id: string) => {
        if (!confirm('Hapus pemasok ini?')) return;
        try {
            const response = await fetch(`http://localhost:5000/api/vendors/${id}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
                this.fetchVendors();
            }
        } catch (error) {
            alert('Gagal menghapus');
        }
    };

    render() {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Database Pemasok</h1>
                        <p className="text-sm font-medium text-slate-400">Manajemen UMKM, Koperasi, dan Tracking Performa Vendor.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all flex items-center gap-2">
                            <BarChart size={16} /> Report Performa
                        </button>
                        <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2">
                            <Plus size={16} /> Tambah Pemasok
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {this.state.isLoading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100">
                            <Loader2 size={40} className="text-emerald-500 animate-spin mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Memuat Database Pemasok...</p>
                        </div>
                    ) : this.state.vendors.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 text-slate-300">
                            <Store size={48} className="mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">Belum ada pemasok terdaftar</p>
                        </div>
                    ) : (
                        this.state.vendors.map((v) => (
                            <div key={v.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-2">
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[8px] font-black uppercase tracking-widest">
                                                {v.type}
                                            </span>
                                            {v.performance > 90 && (
                                                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                    <TrendingUp size={8} /> Top Vendor
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={() => this.handleDelete(v.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800 mt-4 mb-2">{v.name}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            <Store size={14} /> {v.category}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest text-wrap">
                                            <MapPin size={14} /> {v.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            <Phone size={14} /> {v.phone}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tracking Performa</p>
                                            <span className="text-xs font-black text-emerald-600">{v.performance}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${v.performance > 80 ? 'bg-emerald-500' : v.performance > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${v.performance}%` }} />
                                        </div>
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

export default SupplierManagement;
