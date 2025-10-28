import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/usersRoutes.js'
import depositoryRecordsRoutes from './routes/depositoryRecordsRoutes.js'
import receptoryRecordsRoutes from './routes/receptoryRecordsRoutes.js'
import laboratoryRecordsRoutes from './routes/laboratoryRecordsRoutes.js'
import newEntriesRoutes from './routes/newEntriesRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import countriesRoutes from './routes/tire_data_routes/countriesRoutes.js'
import sizesRoutes from './routes/tire_data_routes/sizesRoutes.js'
import customersRoutes from './routes/tire_data_routes/customersRoutes.js'
import brandsRoutes from './routes/tire_data_routes/brandsRoutes.js'
import retrievalFormRoutes from './routes/retrievalFormRoutes.js'
// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dotenv.config();
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: join(__dirname, '.env.production') });
} else {
  dotenv.config({ path: join(__dirname, '.env.development') });
}

const app = express();

app.use(cors({
  origin: [
    'https://tire.rierco.net',
    'http://localhost:5173',
    'http://localhost:8080', 
    'http://194.180.11.232:8080'
  ],

  credentials: true   
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/depositoryRecords', depositoryRecordsRoutes)
app.use('/api/receptoryRecords', receptoryRecordsRoutes)
app.use('/api/laboratoryRecords', laboratoryRecordsRoutes)
app.use('/api/newEntries', newEntriesRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/countries', countriesRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/sizes', sizesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/retrievalForm', retrievalFormRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
