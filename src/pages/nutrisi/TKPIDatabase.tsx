import React, { Component } from 'react';

export class TKPIDatabase extends Component {
    handleImportTKPI = async (tkpi: any) => {
        if (!confirm(`Import ${tkpi.name} ke database lokal?`)) return;
        try {
            const response = await fetch('http://localhost:5000/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: tkpi.name,
                    category: 'TKPI Import',
                    calories: tkpi.cal,
                    protein: tkpi.pro,
                    fats: tkpi.fat,
                    carbs: 0
                })
            });
            const result = await response.json();
            if (result.success) {
                alert('Berhasil mengimpor dari TKPI');
            }
        } catch (err) {
            alert('Gagal mengimpor');
        }
    };

    render() {
        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm animate-in fade-in duration-700">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Database TKPI (Kemenkes)</h3>
                <div className="space-y-4">
                    {[
                        { code: 'A:S001', name: 'Beras Giling Masak (Nasi)', cal: 130, pro: 2.7, fat: 0.3 },
                        { code: 'A:S002', name: 'Jagung Kuning Pipil Masak', cal: 150, pro: 4.5, fat: 1.2 },
                        { code: 'B:U001', name: 'Ubi Jalar Merah Kukus', cal: 112, pro: 1.1, fat: 0.1 },
                    ].map((tkpi, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between group hover:bg-slate-900 hover:text-white transition-all">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black px-2 py-1 bg-white/10 border border-slate-200 rounded-lg group-hover:border-white/20">{tkpi.code}</span>
                                <h4 className="font-black text-sm">{tkpi.name}</h4>
                            </div>
                            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                                <span>Cal: {tkpi.cal}</span>
                                <span>Pro: {tkpi.pro}g</span>
                                <button onClick={() => this.handleImportTKPI(tkpi)} className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Import</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TKPIDatabase;
