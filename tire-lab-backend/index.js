import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dotenv.config();
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: join(__dirname, '.env.production') });
} else {
  dotenv.config({ path: join(__dirname, '.env.development') });
}
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



const app = express();

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works!', timestamp: new Date() });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Root test works!' });
});

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

console.log('Loading routes...');

try {
  console.log('✓ Loading auth routes');
  app.use('/api/auth', authRoutes);
} catch (e) { console.error('✗ Error loading auth routes:', e.message); }

try {
  console.log('✓ Loading users routes');
  app.use('/api/users', userRoutes);
} catch (e) { console.error('✗ Error loading users routes:', e.message); }

try {
  console.log('✓ Loading depositoryRecords routes');
  app.use('/api/depositoryRecords', depositoryRecordsRoutes);
} catch (e) { console.error('✗ Error loading depositoryRecords routes:', e.message); }

try {
  console.log('✓ Loading receptoryRecords routes');
  app.use('/api/receptoryRecords', receptoryRecordsRoutes);
} catch (e) { console.error('✗ Error loading receptoryRecords routes:', e.message); }

try {
  console.log('✓ Loading laboratoryRecords routes');
  app.use('/api/laboratoryRecords', laboratoryRecordsRoutes);
} catch (e) { console.error('✗ Error loading laboratoryRecords routes:', e.message); }

try {
  console.log('✓ Loading newEntries routes');
  app.use('/api/newEntries', newEntriesRoutes);
} catch (e) { console.error('✗ Error loading newEntries routes:', e.message); }

try {
  console.log('✓ Loading dashboard routes');
  app.use('/api/dashboard', dashboardRoutes);
} catch (e) { console.error('✗ Error loading dashboard routes:', e.message); }

try {
  console.log('✓ Loading countries routes');
  app.use('/api/countries', countriesRoutes);
} catch (e) { console.error('✗ Error loading countries routes:', e.message); }

try {
  console.log('✓ Loading brands routes');
  app.use('/api/brands', brandsRoutes);
} catch (e) { console.error('✗ Error loading brands routes:', e.message); }

try {
  console.log('✓ Loading sizes routes');
  app.use('/api/sizes', sizesRoutes);
} catch (e) { console.error('✗ Error loading sizes routes:', e.message); }

try {
  console.log('✓ Loading customers routes');
  app.use('/api/customers', customersRoutes);
} catch (e) { console.error('✗ Error loading customers routes:', e.message); }

try {
  console.log('✓ Loading retrievalForm routes');
  app.use('/api/retrievalForm', retrievalFormRoutes);
} catch (e) { console.error('✗ Error loading retrievalForm routes:', e.message); }

console.log('All routes loaded!');

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
