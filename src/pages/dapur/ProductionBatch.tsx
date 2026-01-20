import React, { Component } from 'react';
import { UtensilsCrossed, Plus, Activity, Play, Check, History } from 'lucide-react';

interface ProductionBatchItem {
    id: string;
    meal_time: string;
    target_portions: number;
    status: string;
    recipes: { name: string };
}

interface State {
    batches: ProductionBatchItem[];
    isLoading: boolean;
    isModalOpen: boolean;
    recipes: { id: string, name: string }[];
    chefs: { id: string, full_name: string }[];
    newBatch: {
        recipeId: string;
        targetPortions: number;
        chefId: string;
        mealTime: string;
    };
}

export class ProductionBatch extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            batches: [],
            isLoading: false,
            isModalOpen: false,
            recipes: [],
            chefs: [],
            newBatch: {
                recipeId: '',
                targetPortions: 100,
                chefId: '',
                mealTime: 'Siang',
            }
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ isLoading: true });
        try {
            const [tasksRes, recipesRes, chefsRes] = await Promise.all([
                fetch('http://localhost:5000/api/kitchen/tasks'),
                fetch('http://localhost:5000/api/nutrition/recipes'),
                fetch('http://localhost:5000/api/profiles')
            ]);
            const tasksData = await tasksRes.json();
            const recipesData = await recipesRes.json();
            const chefsData = await chefsRes.json();

            this.setState({
                batches: tasksData.success ? tasksData.data : [],
                recipes: recipesData.success ? recipesData.data : [],
                chefs: chefsData.success ? chefsData.data : [],
                isLoading: false
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { batches, isLoading } = this.state;

        return (
            <div className="space-y-6 animate-in fade-in duration-700">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 italic">
                        <UtensilsCrossed size={20} className="text-orange-500" /> Antrean Batch Aktif
                    </h2>
                    <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-orange-700 transition-all shadow-xl active:scale-95">
                        <Plus size={16} /> Register New Batch
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100">
                        <Activity size={48} className="text-orange-500 animate-spin mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sinkronisasi Database Dapur...</p>
                    </div>
                ) : batches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100">
                        <UtensilsCrossed size={48} className="text-slate-200 mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tidak ada antrean masak aktif</p>
                    </div>
                ) : batches.map(batch => (
                    <div key={batch.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all border-l-[6px] border-l-orange-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-orange-50 text-orange-600 uppercase tracking-widest">
                                        {batch.status}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                        <History size={14} /> {batch.meal_time}
                                    </div>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{batch.recipes?.name || 'Menu Unnamed'}</h4>
                            </div>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95">
                                Progres Batch <Play size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ProductionBatch;
