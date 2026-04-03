export interface Building {
  id: string;
  name: string;
  address: string;
}

export interface Apartment {
  id: string;
  buildingId: string;
  title: string;
  publicSlug: string;
  sections: Section[];
}

export type SectionType = 'wifi' | 'entry' | 'rules' | 'contact' | 'laundry' | 'custom' | 'link';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  content: Record<string, string>;
  order: number;
}

export interface ApartmentWithBuilding extends Apartment {
  buildingName: string;
}
