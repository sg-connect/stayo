import express from 'express';
import cors from 'cors';
import apartmentsRouter from './routes/apartments.js';
import publicRouter from './routes/public.js';
import qrRouter from './routes/qr.js';

const app = express();
const PORT = process.env['PORT'] || 3200;

app.use(cors());
app.use(express.json());

app.use('/api/apartments', apartmentsRouter);
app.use('/api/public', publicRouter);
app.use('/api/qr', qrRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`  Stayo API running at http://localhost:${PORT}`);
});
