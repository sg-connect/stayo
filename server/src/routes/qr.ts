import { Router, Request, Response } from 'express';
import QRCode from 'qrcode';
import { findApartmentBySlug } from '../data/store.js';

const router = Router();

const BASE_URL = process.env['PUBLIC_BASE_URL'] || 'http://localhost:4200';

// GET /api/qr/:slug — generate QR code PNG
router.get('/:slug', async (req: Request, res: Response) => {
  const apt = findApartmentBySlug(req.params.slug);
  if (!apt) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }

  const publicUrl = `${BASE_URL}/a/${apt.publicSlug}`;

  try {
    const pngBuffer = await QRCode.toBuffer(publicUrl, {
      type: 'png',
      width: 1024,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });
    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', `inline; filename="qr-${apt.publicSlug}.png"`);
    res.send(pngBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// GET /api/qr/:slug/data — return QR as data URL (for embedding)
router.get('/:slug/data', async (req: Request, res: Response) => {
  const apt = findApartmentBySlug(req.params.slug);
  if (!apt) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }

  const publicUrl = `${BASE_URL}/a/${apt.publicSlug}`;

  try {
    const dataUrl = await QRCode.toDataURL(publicUrl, {
      width: 512,
      margin: 2,
    });
    res.json({ dataUrl, publicUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

export default router;
