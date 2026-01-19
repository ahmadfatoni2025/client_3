import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Apple,
    ChefHat,
    Wallet,
    Settings,
    ChevronRight,
    // Mail,
    // Zap,
    // BarChart3,
    // Plug2,
    HelpCircle,
    MessageSquare,
    Sparkles,
    Menu,
    X
} from 'lucide-react';

const mainNav = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Nutrisi', path: '/nutrisi', icon: Apple },
    { name: 'Dapur', path: '/dapur', icon: ChefHat },
    { name: 'Keuangan', path: '/keuangan', icon: Wallet },
];


interface State {
    searchQuery: string;
    isMobileOpen: boolean;
}

export class Navbar extends Component<{}, State> {
    private searchRef = React.createRef<HTMLInputElement>();

    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isMobileOpen: false
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            this.searchRef.current?.focus();
        }
    };

    toggleMobileMenu = () => {
        this.setState(prev => ({ isMobileOpen: !prev.isMobileOpen }));
    };

    navLinkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all group
    ${isActive
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }
  `;

    render() {
        const { isMobileOpen } = this.state;

        return (
            <>
                {/* Mobile Header Toggle */}
                <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-40 backdrop-blur-md bg-white/80">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black italic text-xs">M.</div>
                        <span className="font-black text-slate-900 text-sm italic">MBG System</span>
                    </div>
                    <button
                        onClick={this.toggleMobileMenu}
                        className="p-2 bg-slate-50 rounded-xl text-slate-900 shadow-sm active:scale-95 transition-all"
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Overlay for Mobile */}
                {isMobileOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
                        onClick={this.toggleMobileMenu}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-900 flex flex-col z-50 overflow-y-auto no-scrollbar transition-transform duration-300 lg:translate-x-0
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    {/* Brand Header */}
                    <div className="p-6">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 mb-8 shadow-2xl">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-emerald-500/20">
                                M.
                            </div>
                            <div>
                                <h2 className="text-[14px] font-black text-white leading-none tracking-tight">MBG System</h2>
                                <p className="text-[9px] font-black text-slate-500 mt-1.5 uppercase tracking-widest">Gov Enterprise</p>
                            </div>
                        </div>

                        {/* Main Menu Section */}
                        <div className="space-y-1.5">
                            <p className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Operations</p>
                            {mainNav.map((item) => (
                                <div key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={this.navLinkClass}
                                        onClick={() => this.setState({ isMobileOpen: false })}
                                    >
                                        <item.icon size={18} className="transition-transform group-hover:scale-110" />
                                        {item.name}
                                    </NavLink>

                                    {item.name === 'Inventory' && (
                                        <div className="ml-9 mt-2 space-y-1 border-l-2 border-slate-800 pl-4 mb-4">
                                            <NavLink to="/stok-barang" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Stok Barang</NavLink>
                                            <NavLink to="/pemasok-umkm" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Pemasok UMKM</NavLink>
                                            <NavLink to="/pengadaan-digital" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Pengadaan Digital</NavLink>
                                            <NavLink to="/scan-opname" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Scan Opname</NavLink>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <NavLink
                                to="/messages"
                                className={this.navLinkClass}
                                onClick={() => this.setState({ isMobileOpen: false })}
                            >
                                <div className="flex flex-1 items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={18} className="transition-transform group-hover:scale-110" />
                                        <span>Pesan masuk</span>
                                    </div>
                                    <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-lg shadow-rose-100">3</span>
                                </div>
                            </NavLink>
                        </div>

                        {/* Settings/Info Section */}
                        <div className="mt-1 pt-4 border-t border-slate-900 space-y-1.5">
                            <p className="px-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Pengaturan tambahan</p>
                            <NavLink
                                to="/help"
                                className={this.navLinkClass}
                                onClick={() => this.setState({ isMobileOpen: false })}
                            >
                                <HelpCircle size={18} />
                                Help center
                            </NavLink>
                            <NavLink
                                to="/feedback"
                                className={this.navLinkClass}
                                onClick={() => this.setState({ isMobileOpen: false })}
                            >
                                <MessageSquare size={18} />
                                Feedback
                            </NavLink>
                            <NavLink
                                to="/pengaturan"
                                className={this.navLinkClass}
                                onClick={() => this.setState({ isMobileOpen: false })}
                            >
                                <Settings size={18} />
                                Settings
                            </NavLink>
                        </div>
                    </div>

                    {/* Upgrade Callout */}
                    <div className="mt-auto p-6">
                        <div className="bg-emerald-600 p-5 rounded-[24px] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center text-white">
                                    <Sparkles size={16} className="animate-pulse" />
                                </div>
                            </div>
                            <p className="text-[12px] font-black text-white leading-tight">Pro License Active</p>
                            <p className="text-[9px] font-bold text-emerald-100 mt-1 uppercase tracking-widest">Premium Support ON</p>
                            <ChevronRight size={14} className="absolute bottom-5 right-5 text-white opacity-40 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </aside>
            </>
        );
    }
}


export default Navbar;