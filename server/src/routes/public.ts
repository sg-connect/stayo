import { Router, Request, Response } from 'express';
import { findApartmentBySlug, findBuildingById } from '../data/store.js';

const router = Router();

// GET /api/public/:slug — public apartment data (no auth)
router.get('/:slug', (req: Request, res: Response) => {
  const apt = findApartmentBySlug(req.params.slug);
  if (!apt) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }
  const building = findBuildingById(apt.buildingId);
  res.json({
    title: apt.title,
    buildingName: building?.name ?? '',
    sections: apt.sections.sort((a, b) => a.order - b.order),
  });
});

export default router;
