import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// --- IMPORT SEMUA ROUTES ---
import inventoryRoutes from './routes/inventoryRoutes';
import profilesRoutes from './routes/profilesRoutes';
import financeRoutes from './routes/financeRoutes';   // <-- Baru
import kitchenRoutes from './routes/kitchenRoutes';   // <-- Baru
import nutritionRoutes from './routes/nutritionRoutes'; // <-- Baru

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- DAFTARKAN SEMUA ENDPOINT ---
app.use('/api/inventory', inventoryRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/finance', financeRoutes);     // <-- Baru
app.use('/api/kitchen', kitchenRoutes);     // <-- Baru
app.use('/api/nutrition', nutritionRoutes); // <-- Baru

app.get('/', (req, res) => {
  res.send('🚀 SPPG Backend API Full Power!');
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}, http://localhost:${PORT}/`);
});