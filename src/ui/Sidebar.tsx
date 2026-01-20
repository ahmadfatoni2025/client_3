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
    X,
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
    isCollapsed: boolean;
    expandedMenus: Record<string, boolean>;
}

export class Sidebar extends Component<{}, State> {
    private searchRef = React.createRef<HTMLInputElement>();

    constructor(props: {}) {
        super(props);
        this.state = {
            searchQuery: '',
            isMobileOpen: false,
            isCollapsed: false,
            expandedMenus: {
                'Inventory': true,
                'Nutrisi': true,
                'Dapur': true,
                'Keuangan': true
            }
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        // Check window width for auto-collapse on smaller screens if desired
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

    toggleSidebar = () => {
        this.setState(prev => ({ isCollapsed: !prev.isCollapsed }));
    };

    toggleSubMenu = (menuName: string) => {
        if (this.state.isCollapsed) {
            this.setState({ isCollapsed: false, expandedMenus: { ...this.state.expandedMenus, [menuName]: true } });
            return;
        }
        this.setState(prev => ({
            expandedMenus: {
                ...prev.expandedMenus,
                [menuName]: !prev.expandedMenus[menuName]
            }
        }));
    };

    navLinkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all group relative
    ${isActive
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }
  `;

    render() {
        const { isMobileOpen, isCollapsed, expandedMenus } = this.state;

        return (
            <>
                {/* Mobile Header Toggle */}
                <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-40 backdrop-blur-md bg-white/80">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8"><img src="https://avatars.githubusercontent.com/u/218720883?v=4" alt="foto_profile" /></div>
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
                    fixed top-0 left-0 h-screen bg-slate-950 border-r border-slate-900 flex flex-col z-50 overflow-y-auto no-scrollbar transition-all duration-300
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}>
                    {/* Brand Header */}
                    <div className="p-6">
                        <div className={`flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 mb-8 shadow-2xl transition-all ${isCollapsed ? 'justify-center p-2' : ''}`}>
                            <div className="w-10 h-10 rounded-xl shrink-0">
                                <img src="https://avatars.githubusercontent.com/u/218720883?v=4" className="rounded-xl" alt="foto_profile" />
                            </div>
                            {!isCollapsed && (
                                <div className="overflow-hidden whitespace-nowrap">
                                    <h2 className="text-[14px] font-black text-white leading-none tracking-tight">MBG System</h2>
                                    <p className="text-[9px] font-black text-slate-500 mt-1.5 uppercase tracking-widest">Gov Enterprise</p>
                                </div>
                            )}
                        </div>

                        {/* Main Menu Section */}
                        <div className="space-y-1.5">
                            {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 transition-opacity duration-300">Operations</p>}

                            {mainNav.map((item) => {
                                const hasSubMenu = ['Inventory', 'Nutrisi', 'Dapur', 'Keuangan'].includes(item.name);
                                const isExpanded = expandedMenus[item.name];

                                return (
                                    <div key={item.name}>
                                        <div className="flex items-center">
                                            <NavLink
                                                to={item.path}
                                                end={item.name === 'Nutrisi' ? false : undefined}
                                                className={({ isActive }) => this.navLinkClass({ isActive }) + ' flex-1'}
                                                onClick={(e) => {
                                                    if (hasSubMenu) {
                                                        // Prevent default navigation if we strictly want sidebar toggle behavior, 
                                                        // but usually we want both. Let's toggle menu on the caret click if possible, 
                                                        // or just toggle expand on main click if user wants that. 
                                                        // For now, toggle sub menu if clicked.
                                                        if (isCollapsed) {
                                                            this.setState({ isCollapsed: false, expandedMenus: { ...expandedMenus, [item.name]: true } });
                                                        } else {
                                                            this.toggleSubMenu(item.name);
                                                        }
                                                    }
                                                    this.setState({ isMobileOpen: false });
                                                }}
                                            >
                                                <item.icon size={18} className={`transition-transform duration-300 ${isCollapsed ? 'mx-auto' : 'group-hover:scale-110'}`} />
                                                {!isCollapsed && <span className="flex-1">{item.name}</span>}

                                                {!isCollapsed && hasSubMenu && (
                                                    <ChevronRight size={14} className={`text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                                )}
                                            </NavLink>
                                        </div>

                                        {!isCollapsed && hasSubMenu && isExpanded && (
                                            <div className="ml-9 mt-2 space-y-1 border-l-2 border-slate-800 pl-4 mb-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                                {item.name === 'Inventory' && (
                                                    <>
                                                        <NavLink to="/stok-barang" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Stok Barang</NavLink>
                                                        <NavLink to="/pemasok-umkm" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Pemasok UMKM</NavLink>
                                                        <NavLink to="/pengadaan-digital" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Pengadaan Digital</NavLink>
                                                        <NavLink to="/scan-opname" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Scan Opname</NavLink>
                                                    </>
                                                )}
                                                {item.name === 'Nutrisi' && (
                                                    <>
                                                        <NavLink to="/nutrisi" end className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Database Gizi</NavLink>
                                                        <NavLink to="/nutrisi/siklus" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Siklus Menu</NavLink>
                                                        <NavLink to="/nutrisi/akg" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Kalkulator AKG</NavLink>
                                                        <NavLink to="/nutrisi/tkpi" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Database TKPI</NavLink>
                                                    </>
                                                )}
                                                {item.name === 'Dapur' && (
                                                    <>
                                                        <NavLink to="/dapur" end className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Produksi</NavLink>
                                                        <NavLink to="/dapur/sop" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">SOP Checklist</NavLink>
                                                        <NavLink to="/dapur/qc" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">QC Sampling</NavLink>
                                                        <NavLink to="/dapur/waste" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Food Waste</NavLink>
                                                    </>
                                                )}
                                                {item.name === 'Keuangan' && (
                                                    <>
                                                        <NavLink to="/keuangan" end className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Overview</NavLink>
                                                        <NavLink to="/keuangan/rab" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">RAB</NavLink>
                                                        <NavLink to="/keuangan/receipt" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">E-Receipts</NavLink>
                                                        <NavLink to="/keuangan/payroll" className="block py-1.5 text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors">Payroll</NavLink>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <NavLink
                                to="/messages"
                                className={this.navLinkClass}
                                onClick={() => this.setState({ isMobileOpen: false })}
                            >
                                <div className="flex flex-1 items-center justify-between">
                                    <div className="flex items-center gap-3 w-full">
                                        <MessageSquare size={18} className={`transition-transform group-hover:scale-110 ${isCollapsed ? 'mx-auto' : ''}`} />
                                        {!isCollapsed && <span>Pesan masuk</span>}
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-lg shadow-rose-600">3</span>
                                    )}
                                </div>
                            </NavLink>
                        </div>

                        {/* Settings/Info Section */}
                        <div className="mt-1 pt-4 border-t border-slate-900 space-y-1.5">
                            {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Pengaturan tambahan</p>}

                            {[
                                { to: '/help', icon: HelpCircle, label: 'Help center' },
                                { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
                                { to: '/pengaturan', icon: Settings, label: 'Settings' }
                            ].map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={this.navLinkClass}
                                    onClick={() => this.setState({ isMobileOpen: false })}
                                >
                                    <link.icon size={18} className={`${isCollapsed ? 'mx-auto' : ''}`} />
                                    {!isCollapsed && link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Toggle */}
                    <div className="mt-auto p-6">
                        {!isCollapsed ? (
                            <div className="bg-emerald-600 p-5 rounded-[24px] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all" onClick={this.toggleSidebar}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center text-white">
                                        <Sparkles size={16} className="animate-pulse" />
                                    </div>
                                    <div className="flex-1 text-right">
                                        <button onClick={(e) => { e.stopPropagation(); this.toggleSidebar(); }} className="text-white/50 hover:text-white"><ChevronRight size={18} className="rotate-180" /></button>
                                    </div>
                                </div>
                                <p className="text-[12px] font-black text-white leading-tight">Pro License Active</p>
                                <p className="text-[9px] font-bold text-emerald-100 mt-1 uppercase tracking-widest">Premium Support ON</p>
                            </div>
                        ) : (
                            <button onClick={this.toggleSidebar} className="w-full flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 transition-all">
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </aside>
            </>
        );
    }
}


export default Sidebar;