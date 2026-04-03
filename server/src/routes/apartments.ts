import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { apartments, buildings, findApartmentById, findBuildingById } from '../data/store.js';
import type { Apartment, ApartmentWithBuilding } from '../types/index.js';

const router = Router();

// GET /api/apartments — list all with building name
router.get('/', (_req: Request, res: Response) => {
  const result: ApartmentWithBuilding[] = apartments.map((apt) => ({
    ...apt,
    buildingName: findBuildingById(apt.buildingId)?.name ?? 'Unknown',
  }));
  res.json(result);
});

// GET /api/apartments/:id
router.get('/:id', (req: Request, res: Response) => {
  const apt = findApartmentById(req.params.id);
  if (!apt) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }
  const building = findBuildingById(apt.buildingId);
  res.json({ ...apt, buildingName: building?.name ?? 'Unknown' });
});

// POST /api/apartments
router.post('/', (req: Request, res: Response) => {
  const body = req.body as Partial<Apartment>;
  if (!body.title || !body.publicSlug || !body.buildingId) {
    res.status(400).json({ error: 'title, publicSlug, and buildingId are required' });
    return;
  }
  if (apartments.some((a) => a.publicSlug === body.publicSlug)) {
    res.status(409).json({ error: 'Slug already exists' });
    return;
  }
  const newApt: Apartment = {
    id: uuid(),
    buildingId: body.buildingId,
    title: body.title,
    publicSlug: body.publicSlug,
    sections: (body.sections ?? []).map((s, i) => ({ ...s, id: s.id || uuid(), order: s.order ?? i })),
  };
  apartments.push(newApt);
  res.status(201).json(newApt);
});

// PUT /api/apartments/:id
router.put('/:id', (req: Request, res: Response) => {
  const idx = apartments.findIndex((a) => a.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }
  const body = req.body as Partial<Apartment>;
  // Check slug uniqueness if changing
  if (body.publicSlug && body.publicSlug !== apartments[idx].publicSlug) {
    if (apartments.some((a) => a.publicSlug === body.publicSlug)) {
      res.status(409).json({ error: 'Slug already exists' });
      return;
    }
  }
  apartments[idx] = {
    ...apartments[idx],
    ...body,
    id: apartments[idx].id, // prevent id override
    sections: (body.sections ?? apartments[idx].sections).map((s, i) => ({
      ...s,
      id: s.id || uuid(),
      order: s.order ?? i,
    })),
  };
  res.json(apartments[idx]);
});

// DELETE /api/apartments/:id
router.delete('/:id', (req: Request, res: Response) => {
  const idx = apartments.findIndex((a) => a.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Apartment not found' });
    return;
  }
  apartments.splice(idx, 1);
  res.status(204).send();
});

// GET /api/buildings — list all buildings
router.get('/buildings/list', (_req: Request, res: Response) => {
  res.json(buildings);
});

export default router;
