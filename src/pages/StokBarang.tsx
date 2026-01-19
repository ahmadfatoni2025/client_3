import { Component } from 'react';
import { Search, Filter, Download, Plus, LayoutGrid, List } from 'lucide-react';
import TabelInventory from '../ui/tabelInventory';

interface State {
    searchQuery: string;
    viewMode: 'grid' | 'table';
}

export class StokBarang extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            viewMode: 'table'
        };
    }

    render() {
        const { searchQuery, viewMode } = this.state;

        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Stok Barang</h1>
                        <p className="text-sm font-medium text-slate-400">Manajemen inventaris dan pelacakan stok produk real-time.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center gap-2">
                            <Plus size={16} /> Tambah Barang
                        </button>
                    </div>
                </header>

                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama produk atau SKU..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                <Filter size={18} />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                <Download size={18} />
                            </button>
                            <div className="w-px h-8 bg-slate-100 mx-2" />
                            <div className="bg-slate-50 p-1 rounded-xl flex items-center gap-1">
                                <button
                                    onClick={() => this.setState({ viewMode: 'grid' })}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => this.setState({ viewMode: 'table' })}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <TabelInventory searchQuery={searchQuery} />
                </div>
            </div>
        );
    }
}

export default StokBarang;
