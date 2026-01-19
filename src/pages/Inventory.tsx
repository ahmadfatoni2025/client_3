import { Component } from 'react';

import {
    Search,
    Download,
    History,
    AlertTriangle,
    BarChart3,
    TrendingUp,
    Store,
    FileText,
    Truck,
    ShoppingBag,
    QrCode
} from 'lucide-react';


import TabelInventory from '../ui/tabelInventory';

interface Vendor {
    id: string;
    name: string;
    type: 'UMKM' | 'Koperasi' | 'PT';
    performance: number;
    category: string;
    lastOrder: string;
}

interface PurchaseOrder {
    id: string;
    vendor: string;
    date: string;
    total: number;
    status: 'Pending' | 'Selesai' | 'Dibatalkan';
}

interface State {
    activeTab: 'inventory' | 'suppliers' | 'procurement' | 'opname';
    searchQuery: string;
    showStats: boolean;
    vendors: Vendor[];
    pos: PurchaseOrder[];
    isAddingVendor: boolean;
    isScanning: boolean;
}

export class Inventory extends Component<{}, State> {
    // Reference to search input if needed for focus management


    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'inventory',
            searchQuery: '',
            showStats: true,
            isAddingVendor: false,
            isScanning: false,
            vendors: [
                { id: 'V001', name: 'Koperasi Tani Makmur', type: 'Koperasi', performance: 95, category: 'Sayuran', lastOrder: '2026-01-18' },
                { id: 'V002', name: 'UMKM Beras Cianjur', type: 'UMKM', performance: 88, category: 'Beras', lastOrder: '2026-01-15' },
                { id: 'V003', name: 'PT Telur Jaya', type: 'PT', performance: 92, category: 'Protein', lastOrder: '2026-01-19' },
            ],
            pos: [
                { id: 'PO-2026-001', vendor: 'Koperasi Tani Makmur', date: '2026-01-18', total: 4500000, status: 'Selesai' },
                { id: 'PO-2026-002', vendor: 'UMKM Beras Cianjur', date: '2026-01-19', total: 12000000, status: 'Pending' },
            ]
        };
    }

    render() {
        const { activeTab, searchQuery, vendors, pos, isAddingVendor, isScanning } = this.state;


        return (
            <div className="space-y-6 pb-20">
                {/* SmartInventory Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
                    <div className="flex items-center gap-4 md:gap-6 relative z-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shrink-0">
                            <ShoppingBag size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">SmartInventory MBG</h1>
                            <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1">Sistem Pengadaan & FIFO Tracking</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <button onClick={() => this.setState({ isScanning: true })} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            <QrCode size={16} /> <span className="hidden sm:inline">Scan QR/Barcode</span><span className="sm:hidden">Scan</span>
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 w-full md:w-fit shadow-sm overflow-x-auto no-scrollbar gap-1">
                    {[
                        { id: 'inventory', label: 'Stok', icon: <History size={16} /> },
                        { id: 'suppliers', label: 'Pemasok', icon: <Truck size={16} /> },
                        { id: 'procurement', label: 'Purchase', icon: <FileText size={16} /> },
                        { id: 'opname', label: 'Audit', icon: <BarChart3 size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => this.setState({ activeTab: tab.id as any })}
                            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {activeTab === 'inventory' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm gap-4">
                                    <div className="relative w-full sm:w-80">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Cari ID barang atau nama..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-orange-50 outline-none transition-all"
                                            value={searchQuery}
                                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <button onClick={() => alert("Mengatur strategi FIFO/LIFO...")} className="flex-1 sm:flex-none px-6 py-2.5 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">FIFO Active</button>
                                        <button onClick={() => alert("Download Laporan Stok...")} className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all"><Download size={20} /></button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto rounded-[28px] border border-slate-100 shadow-sm">
                                    <TabelInventory searchQuery={searchQuery} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'suppliers' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pemasok UMKM & Koperasi</h3>
                                    <button onClick={() => this.setState({ isAddingVendor: true })} className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Tambah Pemasok</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {vendors.map(v => (
                                        <div key={v.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Store size={60} /></div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${v.type === 'UMKM' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{v.type}</span>
                                                <span className="text-[10px] font-black text-slate-400">#{v.id}</span>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 mb-1">{v.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kategori: {v.category}</p>

                                            <div className="mt-8 space-y-4 pt-6 border-t border-slate-200">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase">Vendor Performance</p>
                                                    <span className="text-xs font-black text-emerald-600">{v.performance}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${v.performance}%` }} />
                                                </div>
                                                <div className="flex justify-between items-center pt-2">
                                                    <p className="text-[10px] font-bold text-slate-400">Order Terakhir: {v.lastOrder}</p>
                                                    <button onClick={() => alert(`Review Performa ${v.name}...`)} className="text-[10px] font-black text-slate-900 hover:underline">Lihat Detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'procurement' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Purchase Order (PO) Digital</h3>
                                    <button onClick={() => alert("Membuat Draft PO Baru...")} className="px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Draft PO Baru</button>
                                </div>
                                <div className="space-y-4">
                                    {pos.map(po => (
                                        <div key={po.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-orange-500 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-800">{po.id}</h4>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{po.vendor} • {po.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-10">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Nilai</p>
                                                    <p className="font-black text-slate-900">Rp {po.total.toLocaleString()}</p>
                                                </div>
                                                <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${po.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'}`}>
                                                    {po.status}
                                                </span>
                                                <button onClick={() => alert(`Download PO ${po.id} (PDF)`)} className="p-3 text-slate-300 hover:text-slate-900 transition-colors"><Download size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'opname' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 text-center py-20">
                                <div className="w-24 h-24 bg-orange-50 rounded-[40px] flex items-center justify-center mx-auto mb-6">
                                    <QrCode size={40} className="text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Real-time Stock Opname</h3>
                                <p className="text-sm font-medium text-slate-400 max-w-sm mx-auto">Gunakan pemindaian QR/Barcode untuk melakukan audit stok secara cepat dan akurat di gudang MBG.</p>
                                <div className="flex justify-center gap-4 pt-6">
                                    <button onClick={() => this.setState({ isScanning: true })} className="px-8 py-4 bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Mulai Scan Audit</button>
                                    <button onClick={() => alert("Membuka Log Audit Terakhir...")} className="px-8 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600">Riwayat Opname</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Minimum Stock Alert */}
                        <div className="bg-red-600 text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><AlertTriangle size={80} /></div>
                            <h3 className="text-lg font-black tracking-tight flex items-center gap-2 mb-4">Stock Alert!</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Barang Kritis</p>
                                    <p className="text-sm font-black mt-1">Beras Mentik (Sisa 12kg)</p>
                                    <button onClick={() => alert("Membuat PO Otomatis untuk Beras...")} className="mt-4 w-full py-2 bg-white text-red-600 rounded-xl text-[10px] font-black uppercase">Re-order Sekarang</button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Log */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">Inbound Logs <History size={16} className="text-slate-300" /></h4>
                            <div className="space-y-6">
                                {[
                                    { time: '14:20', text: 'Stok Masuk: 500kg Ayam', type: 'in' },
                                    { time: '12:00', text: 'Opname Batch #22 Selesai', type: 'info' },
                                    { time: '09:45', text: 'PO-2026-001 Dervalidasi', type: 'check' }
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== 2 && <div className="absolute left-1 top-4 bottom-0 w-px bg-slate-100" />}
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-800">{log.text}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-tighter uppercase">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vendor Performance Quick Chart */}
                        <div className="bg-slate-900 text-white rounded-[40px] p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xs font-black uppercase tracking-widest">Global Vendor Rank</h4>
                                <TrendingUp size={16} className="text-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-slate-400">Quality Rate</span><span className="text-xs font-black">98.2%</span></div>
                                <div className="flex justify-between items-center"><span className="text-[11px] font-bold text-slate-400">On-Time Delivery</span><span className="text-xs font-black">94.5%</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scan Modal Simulation */}
                {isScanning && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
                        <div className="max-w-md w-full text-center space-y-8">
                            <div className="relative w-64 h-64 mx-auto border-4 border-orange-500 rounded-[40px] overflow-hidden flex items-center justify-center bg-black">
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/20 to-transparent animate-pulse" />

                                <QrCode size={120} className="text-white opacity-20" />
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] animate-bounce" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Scanning QR / Barcode...</h2>
                                <p className="text-slate-400 text-sm mt-2">Arahkan kamera ke label barang untuk stok opname otomatis.</p>
                            </div>
                            <button onClick={() => this.setState({ isScanning: false })} className="px-12 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Selesai / Batal</button>
                        </div>
                    </div>
                )}

                {/* Add Vendor Modal */}
                {isAddingVendor && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden border border-slate-100">
                            <div className="bg-slate-900 p-8 text-white">
                                <h2 className="text-2xl font-black">Registrasi Pemasok Baru</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">UMKM & Koperasi Database</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.setState({ isAddingVendor: false }); alert("Pemasok baru berhasil diregistrasi ke sistem."); }} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Usaha / Pemasok</label>
                                    <input required type="text" placeholder="Misal: Koperasi Tani Berkah" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe Entitas</label>
                                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold">
                                            <option>UMKM</option>
                                            <option>Koperasi</option>
                                            <option>PT</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Utama</label>
                                        <input required type="text" placeholder="Misal: Sayuran" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => this.setState({ isAddingVendor: false })} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Validasi & Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Inventory;
