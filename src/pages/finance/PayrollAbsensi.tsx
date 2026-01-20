import React, { Component } from 'react';
import { Users, Plus } from 'lucide-react';

export class PayrollAbsensi extends Component {
    state = {
        payroll: [
            { name: 'Ahmad Fauzi', role: 'Head Chef', attendance: 100, salary: 7500000 },
            { name: 'Siti Aminah', role: 'Nutrisionis', attendance: 95, salary: 6500000 },
            { name: 'Budi Santoso', role: 'Logistik Area A', attendance: 88, salary: 4500000 }
        ]
    };

    render() {
        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 italic"><Users size={24} className="text-slate-900" /> Payroll System (Attendance Integrated)</h3>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><Plus size={20} /></button>
                </div>
                <div className="space-y-4">
                    {this.state.payroll.map((p, i) => (
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
                                <button className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Bayar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default PayrollAbsensi;
