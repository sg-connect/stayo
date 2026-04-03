import { v4 as uuid } from 'uuid';
import type { Building, Apartment } from '../types/index.js';

export const buildings: Building[] = [
  { id: uuid(), name: 'Strandvägen 12', address: 'Strandvägen 12, Stockholm' },
  { id: uuid(), name: 'Kungsholmen Hub', address: 'Hantverkargatan 5, Stockholm' },
];

export const apartments: Apartment[] = [
  {
    id: uuid(),
    buildingId: buildings[0].id,
    title: 'Apartment 3B',
    publicSlug: 'strandvagen-3b',
    sections: [
      {
        id: uuid(),
        type: 'wifi',
        title: 'WiFi',
        content: { network: 'Strand_Guest', password: 'welcome2024' },
        order: 0,
      },
      {
        id: uuid(),
        type: 'entry',
        title: 'Entry Instructions',
        content: { text: 'Door code: 4521. Take the elevator to the 3rd floor, turn left. Key is in the lockbox next to the door — code 8833.' },
        order: 1,
      },
      {
        id: uuid(),
        type: 'rules',
        title: 'House Rules',
        content: { text: 'No smoking indoors.\nQuiet hours: 22:00–07:00.\nPlease sort recycling in the bins under the sink.\nNo parties or events without prior approval.' },
        order: 2,
      },
      {
        id: uuid(),
        type: 'contact',
        title: 'Contact',
        content: { name: 'Anna Lindberg', phone: '+46 70 123 4567', email: 'anna@strandvagen.se' },
        order: 3,
      },
      {
        id: uuid(),
        type: 'laundry',
        title: 'Laundry',
        content: { text: 'Shared laundry room in the basement. Book your slot via the link below.', link: 'https://booking.example.com/laundry' },
        order: 4,
      },
      {
        id: uuid(),
        type: 'link',
        title: 'Neighborhood Guide',
        content: { label: 'Stockholm City Guide', url: 'https://visitstockholm.com' },
        order: 5,
      },
    ],
  },
  {
    id: uuid(),
    buildingId: buildings[0].id,
    title: 'Studio 1A',
    publicSlug: 'strandvagen-1a',
    sections: [
      {
        id: uuid(),
        type: 'wifi',
        title: 'WiFi',
        content: { network: 'Strand_Guest', password: 'welcome2024' },
        order: 0,
      },
      {
        id: uuid(),
        type: 'entry',
        title: 'Entry Instructions',
        content: { text: 'Door code: 4521. Ground floor, first door on the right. Key under the mat.' },
        order: 1,
      },
      {
        id: uuid(),
        type: 'contact',
        title: 'Contact',
        content: { name: 'Anna Lindberg', phone: '+46 70 123 4567', email: 'anna@strandvagen.se' },
        order: 2,
      },
    ],
  },
  {
    id: uuid(),
    buildingId: buildings[1].id,
    title: 'Penthouse Suite',
    publicSlug: 'kungsholmen-penthouse',
    sections: [
      {
        id: uuid(),
        type: 'wifi',
        title: 'WiFi',
        content: { network: 'KH_Premium', password: 'skyline99' },
        order: 0,
      },
      {
        id: uuid(),
        type: 'entry',
        title: 'Entry',
        content: { text: 'Use the private elevator with code 7700. Top floor.' },
        order: 1,
      },
      {
        id: uuid(),
        type: 'rules',
        title: 'House Rules',
        content: { text: 'No smoking. No pets. Quiet hours after 23:00.' },
        order: 2,
      },
      {
        id: uuid(),
        type: 'custom',
        title: 'Checkout',
        content: { title: 'Checkout Instructions', text: 'Please leave keys on the kitchen counter. Check out by 11:00.' },
        order: 3,
      },
    ],
  },
];

export function findApartmentBySlug(slug: string): Apartment | undefined {
  return apartments.find((a) => a.publicSlug === slug);
}

export function findApartmentById(id: string): Apartment | undefined {
  return apartments.find((a) => a.id === id);
}

export function findBuildingById(id: string): Building | undefined {
  return buildings.find((b) => b.id === id);
}
