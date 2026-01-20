import React, { Component, FormEvent } from 'react';
import { Calendar, RefreshCcw, Plus } from 'lucide-react';

interface MenuPlan {
    id: string;
    day: string;
    meals: { type: 'Pagi' | 'Siang' | 'Sore', menu: string, calories: number }[];
}

interface State {
    menuCycle: MenuPlan[];
    isPlannerModalOpen: boolean;
    menuRecipes: { id: string, name: string }[];
    plannerBatch: { day: string, mealTime: string, recipeId: string, portions: number };
    isLoading: boolean;
}

export class MenuCycle extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            menuCycle: [
                { id: '1', day: 'Senin', meals: [{ type: 'Siang', menu: 'Nasi Ayam Serundeng + Sayur Asem', calories: 450 }] },
                { id: '2', day: 'Selasa', meals: [{ type: 'Siang', menu: 'Nasi Ikan Goreng + Tumis Kacang', calories: 420 }] },
            ],
            isPlannerModalOpen: false,
            menuRecipes: [],
            plannerBatch: { day: 'Senin', mealTime: 'Siang', recipeId: '', portions: 100 },
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/nutrition/recipes');
            const result = await res.json();
            if (result.success) {
                this.setState({ menuRecipes: result.data });
            }
        } catch (err) {
            console.error(err);
        }
    };

    handleSaveMenuPlan = async (e: FormEvent) => {
        e.preventDefault();
        const { plannerBatch } = this.state;
        this.setState({ isLoading: true });
        try {
            const response = await fetch('http://localhost:5000/api/nutrition/menu-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: new Date().toISOString().split('T')[0],
                    mealTime: plannerBatch.mealTime,
                    recipeId: plannerBatch.recipeId,
                    targetPortions: plannerBatch.portions
                })
            });
            const result = await response.json();
            if (result.success) {
                alert('Menu berhasil direncanakan!');
                this.setState({ isPlannerModalOpen: false });
            }
        } catch (err) {
            alert('Gagal menyimpan rencana menu');
        } finally {
            this.setState({ isLoading: false });
        }
    };

    togglePlannerModal = (day?: string) => {
        this.setState(prev => ({
            isPlannerModalOpen: !prev.isPlannerModalOpen,
            plannerBatch: day ? { ...prev.plannerBatch, day } : prev.plannerBatch
        }));
    };

    render() {
        const { menuCycle, isPlannerModalOpen, menuRecipes, plannerBatch } = this.state;

        return (
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Penyusunan Siklus Menu</h3>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600">Mingguan</button>
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Bulanan</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuCycle.map(plan => (
                        <div key={plan.id} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-black text-slate-800 underline decoration-emerald-500 decoration-4 underline-offset-4">{plan.day}</h4>
                                <button onClick={() => this.togglePlannerModal(plan.day)} className="text-[10px] font-black text-emerald-600 uppercase">Input Menu</button>
                            </div>
                            {plan.meals.map((meal: any, idx: number) => (
                                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{meal.type}</p>
                                    <p className="text-sm font-black text-slate-800">{meal.menu}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{meal.calories} kkal</span>
                                        <button className="flex items-center gap-1 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors"><RefreshCcw size={10} /> Substitusi</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                        <Plus size={32} />
                        <span className="text-xs font-black uppercase tracking-widest">Tambah Hari Cycle</span>
                    </button>
                </div>

                {isPlannerModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden border border-slate-100">
                            <div className="bg-slate-900 p-8 text-white">
                                <h2 className="text-2xl font-black tracking-tight">Rencanakan Menu</h2>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1">Hari: {plannerBatch.day}</p>
                            </div>
                            <form onSubmit={this.handleSaveMenuPlan} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Resep</label>
                                    <select
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none"
                                        value={plannerBatch.recipeId}
                                        onChange={(e) => this.setState({ plannerBatch: { ...plannerBatch, recipeId: e.target.value } })}
                                    >
                                        <option value="">Pilih Menu...</option>
                                        {menuRecipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Waktu Makan</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold"
                                        value={plannerBatch.mealTime}
                                        onChange={(e) => this.setState({ plannerBatch: { ...plannerBatch, mealTime: e.target.value } })}
                                    >
                                        <option value="Pagi">Pagi</option>
                                        <option value="Siang">Siang</option>
                                        <option value="Sore">Sore</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Porsi</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold"
                                        value={plannerBatch.portions}
                                        onChange={(e) => this.setState({ plannerBatch: { ...plannerBatch, portions: parseInt(e.target.value) } })}
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => this.togglePlannerModal()} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Batal</button>
                                    <button type="submit" className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 active:scale-95 transition-all">Simpan Rencana</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default MenuCycle;
