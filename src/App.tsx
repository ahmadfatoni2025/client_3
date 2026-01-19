import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './ui/navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Nutrisi from './pages/Nutrisi';
import Dapur from './pages/Dapur';
import Keuangan from './pages/Keuangan';
import Pengaturan from './pages/Pengaturan';
import Messages from './pages/Messages';
import Email from './pages/Email';
import Automation from './pages/Automation';
import Analytics from './pages/Analytics';
import Help from './pages/Help';
import Feedback from './pages/Feedback';

import StokBarang from './pages/StokBarang';
import PemasokUMKM from './pages/PemasokUMKM';
import PengadaanDigital from './pages/PengadaanDigital';
import ScanOpname from './pages/ScanOpname';

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="flex min-h-screen bg-[#f8fafc]">
          {/* Sidebar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-24 lg:pt-8 min-h-screen overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/stok-barang" element={<StokBarang />} />
                <Route path="/pemasok-umkm" element={<PemasokUMKM />} />
                <Route path="/pengadaan-digital" element={<PengadaanDigital />} />
                <Route path="/scan-opname" element={<ScanOpname />} />
                <Route path="/nutrisi" element={<Nutrisi />} />
                <Route path="/dapur" element={<Dapur />} />
                <Route path="/keuangan" element={<Keuangan />} />
                <Route path="/pengaturan" element={<Pengaturan />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/email" element={<Email />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/help" element={<Help />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;