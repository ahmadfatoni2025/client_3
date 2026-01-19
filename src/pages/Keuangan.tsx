import { Component } from 'react';
import {
    Wallet,
    TrendingUp,
    ArrowRight,
    FileText,
    Receipt,
    Users,
    CreditCard,
    Plus,
    X,
    MapPin,
    CheckCircle2,
    Download,
    RefreshCcw,
    PieChart,
    Building2,
    Clock,
    AlertCircle
} from 'lucide-react';


interface RABItem {
    id: string;
    item: string;
    qty: number;
    unit: string;
    price: number;
}

interface EReceipt {
    id: string;
    merchant: string;
    date: string;
    amount: number;
    tag: 'Bahan Baku' | 'Operasional' | 'Logistik';
    geotag: string;
}

interface State {
    activeTab: 'summary' | 'rab' | 'receipt' | 'reco' | 'payroll';
    rabItems: RABItem[];
    receipts: EReceipt[];
    vaStatus: { bank: string, vaNumber: string, balance: number, status: string }[];
    payroll: { name: string, role: string, attendance: number, salary: number }[];
    isAddingRAB: boolean;
    isAddingReceipt: boolean;
}

export class Keuangan extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 'summary',
            isAddingRAB: false,
            isAddingReceipt: false,
            vaStatus: [
                { bank: 'Bank Mandiri', vaNumber: '8872 0012 3456 7890', balance: 125000000, status: 'Aktif' },
                { bank: 'Bank BRI', vaNumber: '9921 0081 2233 4455', balance: 45000000, status: 'Aktif' }
            ],
            rabItems: [
                { id: '1', item: 'Beras Mentik Spesial', qty: 1000, unit: 'Kg', price: 13000 },
                { id: '2', item: 'Daging Ayam Broiler', qty: 500, unit: 'Kg', price: 35000 },
                { id: '3', item: 'Minyak Goreng Sawit', qty: 200, unit: 'Ltr', price: 15000 }
            ],
            receipts: [
                { id: 'REC-001', merchant: 'Pasar Induk Tangerang', date: '2026-01-19 10:30', amount: 4500000, tag: 'Bahan Baku', geotag: '-6.1751, 106.8271' },
                { id: 'REC-002', merchant: 'SPBU Pertamina 34-123', date: '2026-01-18 14:20', amount: 350000, tag: 'Logistik', geotag: '-6.2088, 106.8456' }
            ],
            payroll: [
                { name: 'Ahmad Fauzi', role: 'Head Chef', attendance: 100, salary: 7500000 },
                { name: 'Siti Aminah', role: 'Nutrisionis', attendance: 95, salary: 6500000 },
                { name: 'Budi Santoso', role: 'Logistik Area A', attendance: 88, salary: 4500000 }
            ]
        };
    }

    handleRemoveRAB = (id: string) => {
        this.setState(prev => ({ rabItems: prev.rabItems.filter(i => i.id !== id) }));
    };

    render() {
        const { activeTab, vaStatus, rabItems, receipts, payroll, isAddingRAB } = this.state;
        const totalRAB = rabItems.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
        const totalBalance = vaStatus.reduce((acc, curr) => acc + curr.balance, 0);

        return (
            <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                {/* Header GovFinance */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 rounded-[20px] md:rounded-[24px] flex items-center justify-center text-white shadow-2xl shrink-0">
                            <Building2 size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">GovFinance MBG</h1>
                            <p className="text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1">Akuntansi & Akuntabilitas Anggaran</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button onClick={() => alert("Menyinkronkan data dengan Perbankan...")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] md:text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <RefreshCcw size={14} className="md:w-4 md:h-4" /> Sync Bank
                        </button>
                        <button onClick={() => alert("Mengunduh Laporan Standar Pemerintah (PDF)...")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                            <Download size={14} className="md:w-4 md:h-4" /> Cetak
                        </button>
                    </div>
                </div>

                {/* Main Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-all group-hover:scale-110" />
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                            <Wallet size={24} />
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Saldo (All VAs)</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-2">Rp {totalBalance.toLocaleString()}</h3>
                        <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-emerald-600">
                            <TrendingUp size={12} /> +Rp 14.5jt Minggu Ini
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-all group-hover:scale-110" />
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
                            <PieChart size={24} />
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Pagu Anggaran Terpakai</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-2">68.4%</h3>
                        <div className="w-full h-2 bg-slate-50 rounded-full mt-4 border border-slate-100">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '68.4%' }} />
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                            <Receipt size={24} />
                        </div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Tagihan Menunggu Bayar</p>
                        <h3 className="text-3xl font-black text-white mt-2">12 <span className="text-sm font-bold opacity-40 uppercase">Invoice</span></h3>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700" />)}
                            </div>
                            <span className="text-[10px] font-black text-white/60">Rp 24,100,000</span>
                        </div>
                    </div>
                </div>

                {/* Sub Navigation */}
                <div className="flex bg-white p-2 rounded-3xl border border-slate-100 w-full md:w-fit shadow-sm overflow-x-auto no-scrollbar gap-1">
                    {[
                        { id: 'summary', label: 'VA & Rekonsiliasi', icon: <CreditCard size={16} /> },
                        { id: 'rab', label: 'Generator RAB', icon: <FileText size={16} /> },
                        { id: 'receipt', label: 'E-Receipts Box', icon: <Receipt size={16} /> },
                        { id: 'payroll', label: 'Payroll & Absensi', icon: <Users size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => this.setState({ activeTab: tab.id as any })}
                            className={`flex items-center gap-3 px-4 md:px-8 py-3.5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab.icon} <span className="hidden xs:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        {activeTab === 'summary' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 italic"><CreditCard size={24} className="text-blue-500" /> Virtual Account Integration</h3>
                                        <button onClick={() => alert("Integrasi VA baru dimulai...")} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><Plus size={20} /></button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {vaStatus.map((va, i) => (
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
                                                    <button onClick={() => alert(`Membuka Riwayat VA ${va.bank}...`)} className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 group-hover:scale-110 transition-all">
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
                                            { desc: 'Unknown Debit di VA BRI', amt: '-125,000', status: 'Unreconciled', icon: <AlertCircle className="text-amber-500" /> },
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
                        )}

                        {activeTab === 'rab' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Rencana Anggaran Belanja (RAB)</h3>
                                    <button onClick={() => this.setState({ isAddingRAB: true })} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                                        <Plus size={16} /> Item Baru
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-left">
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detail Komoditas</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kuantitas</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Harga Satuan</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                                                <th className="pb-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {rabItems.map(item => (
                                                <tr key={item.id} className="group hover:bg-slate-50 transition-all">
                                                    <td className="py-6 font-bold text-slate-800">{item.item}</td>
                                                    <td className="py-6 font-black text-slate-500">{item.qty} <span className="text-[10px]">{item.unit}</span></td>
                                                    <td className="py-6 text-right font-black text-slate-800">Rp {item.price.toLocaleString()}</td>
                                                    <td className="py-6 text-right font-black text-blue-600">Rp {(item.qty * item.price).toLocaleString()}</td>
                                                    <td className="py-6 text-right">
                                                        <button onClick={() => this.handleRemoveRAB(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-slate-900 text-white">
                                                <td colSpan={3} className="px-6 py-6 rounded-l-[24px] font-black uppercase tracking-widest text-xs">Total Anggaran Proyeksi</td>
                                                <td className="px-6 py-6 text-right font-black text-xl">Rp {totalRAB.toLocaleString()}</td>
                                                <td className="rounded-r-[24px]"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'receipt' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><Receipt size={24} className="text-amber-500" /> E-Receipts & Geotagging</h3>
                                    <button onClick={() => alert("Membuka kamera untuk Scan E-Receipt...")} className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                                        <Plus size={16} /> Scan Bukti
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {receipts.map(rec => (
                                        <div key={rec.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:shadow-lg transition-all relative group">
                                            <div className="absolute top-4 right-4"><Receipt className="text-slate-200" size={40} /></div>
                                            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-tighter mb-4 inline-block">{rec.tag}</span>
                                            <h4 className="text-lg font-black text-slate-800 leading-tight">{rec.merchant}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest mb-6">{rec.date}</p>

                                            <div className="space-y-4 pt-4 border-t border-slate-200">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs font-bold text-slate-500">Jumlah Bayar</p>
                                                    <p className="text-lg font-black text-slate-900">Rp {rec.amount.toLocaleString()}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 p-2 rounded-xl">
                                                    <MapPin size={12} /> Geotag: {rec.geotag}
                                                </div>
                                            </div>
                                            <button onClick={() => alert(`Reviewing Detail for ${rec.id}...`)} className="w-full mt-4 py-3 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-900 transition-all opacity-0 group-hover:opacity-100">Review Validitas</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'payroll' && (
                            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 italic"><Users size={24} className="text-slate-900" /> Payroll System (Attendance Integrated)</h3>
                                    <button onClick={() => alert("Laporan Absensi dikirim ke HR...")} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><Plus size={20} /></button>
                                </div>
                                <div className="space-y-4">
                                    {payroll.map((p, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-white hover:border-slate-900 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-[16px] md:rounded-[20px] flex items-center justify-center text-slate-300 shadow-sm border border-slate-100 shrink-0">
                                                    <Users size={24} className="md:w-7 md:h-7" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-800 text-base md:text-lg">{p.name}</h4>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.role}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:flex sm:items-center sm:gap-12 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-4">
                                                <div className="text-left sm:text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Absensi</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                            <div className="h-full bg-emerald-500" style={{ width: `${p.attendance}%` }} />
                                                        </div>
                                                        <span className="text-xs font-black text-slate-700">{p.attendance}%</span>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gaji Take Home</p>
                                                    <p className="text-lg font-black text-slate-900">Rp {p.salary.toLocaleString()}</p>
                                                </div>
                                                <button onClick={() => alert(`Membayar Gaji untuk ${p.name}...`)} className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Bayar</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Notifications & Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-emerald-600 text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="text-lg font-black tracking-tight flex items-center gap-2 mb-6">
                                <CreditCard size={20} className="text-emerald-200" /> Pengajuan Dana
                            </h3>
                            <p className="text-xs text-emerald-100 font-medium mb-6 leading-relaxed">Ada 3 pengajuan dana operasional dapur yang butuh persetujuan Admin Keuangan.</p>
                            <div className="space-y-4">
                                <button onClick={() => alert("Dana Operasional Dapur Sebesar Rp 1.5jt disetujui")} className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                    Approve Operasional
                                </button>
                                <button onClick={() => alert("Bahan Baku Logistik Sebesar Rp 4.2jt disetujui")} className="w-full py-4 bg-white text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
                                    Approve Bahan Baku
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity Log */}
                        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                            <h4 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center justify-between italic">
                                News Feed <Clock size={16} className="text-slate-300" />
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { time: '11:20', text: 'Pencairan VA Mandiri Berhasil', type: 'in' },
                                    { time: '10:45', text: 'RAB Unit B telah direvisi', type: 'info' },
                                    { time: '09:00', text: 'Payroll Tim Logistik Selesai', type: 'in' }
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== 2 && <div className="absolute left-1 top-4 bottom-0 w-px bg-slate-100" />}
                                        <div className={`w-2 h-2 rounded-full mt-1.5 ${log.type === 'in' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-800">{log.text}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-tighter uppercase">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => alert("Membuka Log Keuangan Lengkap...")} className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest pt-4 border-t border-slate-50">
                                    View Full History <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RAB ITEM MODAL */}
                {isAddingRAB && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden border border-slate-100">
                            <div className="bg-slate-900 p-8 text-white">
                                <h2 className="text-2xl font-black">Tambah Item RAB</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">Rencana Anggaran Belanja (MBG)</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.setState({ isAddingRAB: false }); alert("Item RAB baru ditambahkan ke proyeksi."); }} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Barang / Jasa</label>
                                    <input required type="text" placeholder="Misal: Daging Sapi Lapis" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-slate-100 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kuantitas</label>
                                        <input required type="number" placeholder="100" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Satuan</label>
                                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold">
                                            <option>Kg</option>
                                            <option>Liter</option>
                                            <option>Pcs</option>
                                            <option>Unit</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Harga Satuan (Rp)</label>
                                    <input required type="number" placeholder="50000" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => this.setState({ isAddingRAB: false })} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Tambahkan Item</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Keuangan;
