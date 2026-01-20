import React, { Component } from 'react';
import { FlaskConical } from 'lucide-react';

export class QCSampling extends Component {
    state = {
        sampling: [
            { id: "SMP-001", name: "Ayam Serundeng", time: "06:30", status: "Aman" },
            { id: "SMP-002", name: "Buncis Tumis", time: "06:45", status: "Proses Lab" }
        ]
    };

    render() {
        return (
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm animate-in fade-in duration-700">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <FlaskConical size={24} className="text-blue-500" /> Sampling Forensik & QC
                </h3>
                <div className="space-y-4">
                    {this.state.sampling.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                                    <FlaskConical size={20} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800">{s.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sampel ID: {s.id} • Jam: {s.time}</p>
                                </div>
                            </div>
                            <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest ${s.status === 'Aman' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                {s.status}
                            </span>
                        </div>
                    ))}
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 active:scale-95 transition-all mt-4">
                        Ambil Sampel Baru
                    </button>
                </div>
            </div>
        );
    }
}

export default QCSampling;
