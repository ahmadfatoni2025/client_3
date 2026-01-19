
// import { ShoppingBag, TrendingUp, Users, CheckCheck, Truck, School } from 'lucide-react';

export const INVENTORY_DATA = [
    { id: 1, name: 'Beras Mentik Wangi 5kg', price: 'Rp 85.000', sales: '1,200', revenue: 'Rp 102jt', stock: '450', status: 'Tersedia', rating: 4.8, selected: false },
    { id: 2, name: 'Minyak Goreng Sawit 2L', price: 'Rp 34.000', sales: '850', revenue: 'Rp 28jt', stock: '0', status: 'Habis', rating: 4.5, selected: false },
    { id: 3, name: 'Telur Ayam Ras (Peti)', price: 'Rp 280.000', sales: '300', revenue: 'Rp 84jt', stock: '25', status: 'Hampir Habis', rating: 4.7, selected: false },
    { id: 4, name: 'Daging Sapi Lokal 1kg', price: 'Rp 145.000', sales: '150', revenue: 'Rp 21jt', stock: '80', status: 'Tersedia', rating: 4.9, selected: false },
    { id: 5, name: 'Ayam Potong Segar', price: 'Rp 35.000', sales: '2,500', revenue: 'Rp 87jt', stock: '120', status: 'Tersedia', rating: 4.6, selected: false },
];

export const MESSAGE_GROUPS = [
    { id: "1", name: "SDN 01 Tangerang", lastMsg: "Makanannya sangat disukai anak-anak, terima kasih!", time: "09:41", type: 'Sekolah' as const, unread: 2, online: true },
    { id: "2", name: "Pemasok Sayur Segar", lastMsg: "Pengiriman wortel akan tiba dalam 30 menit.", time: "09:12", type: 'Pemasok' as const, unread: 0, online: false },
    { id: "3", name: "Tim Logistik MBG", lastMsg: "Rute distribusi area B sudah selesai.", time: "08:55", type: 'Internal' as const, unread: 0, online: true },
    { id: "4", name: "SMP Merdeka 04", lastMsg: "Apakah porsi besok bisa ditambah 10?", time: "Kemarin", type: 'Sekolah' as const, unread: 0, online: true }
];

export const ALL_MESSAGES: Record<string, any[]> = {
    "1": [
        { id: "m1", sender: "SDN 01 Tangerang", text: "Selamat pagi, tim MBG. Untuk menu hari ini apakah sudah dalam perjalanan?", time: "08:15", isMe: false },
        { id: "m2", sender: "Me", text: "Selamat pagi! Iya, sedang dalam perjalanan oleh kurir kami. Estimasi tiba jam 08:45.", time: "08:18", isMe: true },
        { id: "m3", sender: "SDN 01 Tangerang", text: "Baik, terima kasih informasinya.", time: "08:20", isMe: false },
        { id: "m4", sender: "Me", text: "Sama-sama. Jangan lupa berikan feedback setelah anak-anak selesai makan ya!", time: "08:22", isMe: true },
        { id: "m5", sender: "SDN 01 Tangerang", text: "Makanannya sangat disukai anak-anak, terima kasih! Terutama ayam serundengnya.", time: "09:41", isMe: false }
    ],
    "2": [
        { id: "p1", sender: "Pemasok Sayur Segar", text: "Wortel dan kangkung sudah kami siapkan.", time: "07:00", isMe: false },
        { id: "p2", sender: "Me", text: "Siap, mohon dikirim sebelum jam 8 pagi ya.", time: "07:05", isMe: true }
    ],
    "3": [
        { id: "l1", sender: "Tim Logistik MBG", text: "Rute Tangerang Kota aman.", time: "08:30", isMe: false }
    ],
    "4": [
        { id: "s1", sender: "SMP Merdeka 04", text: "Apakah porsi besok bisa ditambah 10?", time: "Kemarin", isMe: false }
    ]
};

export const EMAIL_DATA = [
    { id: '1', sender: 'Kemenkes RI', subject: 'Pembaruan Standar AKG 2026', time: '09:24', preview: 'Halo Tim MBG, berikut adalah dokumen terbaru mengenai regulasi...', isRead: false, isStarred: true, category: 'Inbox' as const },
    { id: '2', sender: 'Koperasi Makmur', subject: 'Invoice Penjualan Beras Batch #44', time: 'Yesterday', preview: 'Terlampir invoice untuk pengiriman beras mentik wangi sebanyak...', isRead: true, isStarred: false, category: 'Inbox' as const },
    { id: '3', sender: 'Bank Mandiri', subject: 'Notifikasi VA Refund #7721', time: 'Jan 18', preview: 'Transaksi pengembalian dana telah berhasil diproses ke rekening...', isRead: true, isStarred: false, category: 'Inbox' as const },
    { id: '4', sender: 'Sistem MBG', subject: 'Alert: Backup Cloud Mingguan Selesai', time: 'Jan 17', preview: 'Data sinkronisasi mingguan telah berhasil dicadangkan ke server...', isRead: true, isStarred: false, category: 'Sent' as const },
];
