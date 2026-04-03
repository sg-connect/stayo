import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment, Building, Section, SectionType, QrData } from '../../models/apartment.model';

@Component({
  selector: 'app-apartment-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apartment-edit.component.html',
  styleUrl: './apartment-edit.component.scss',
})
export class ApartmentEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apartmentService = inject(ApartmentService);

  isNew = false;
  loading = true;
  saving = false;
  apartmentId = '';

  title = '';
  publicSlug = '';
  buildingId = '';
  sections: Section[] = [];
  buildings: Building[] = [];
  qrData: QrData | null = null;

  sectionTypes: { value: SectionType; label: string }[] = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'entry', label: 'Entry Instructions' },
    { value: 'rules', label: 'House Rules' },
    { value: 'contact', label: 'Contact' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'custom', label: 'Custom Text' },
    { value: 'link', label: 'External Link' },
  ];

  ngOnInit() {
    this.apartmentService.getBuildings().subscribe((b) => (this.buildings = b));

    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id === 'new') {
      this.isNew = true;
      this.loading = false;
      return;
    }

    this.apartmentId = id;
    this.apartmentService.getById(id).subscribe({
      next: (apt) => {
        this.title = apt.title;
        this.publicSlug = apt.publicSlug;
        this.buildingId = apt.buildingId;
        this.sections = apt.sections.sort((a, b) => a.order - b.order);
        this.loading = false;
        this.loadQr();
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
    });
  }

  loadQr() {
    if (this.publicSlug) {
      this.apartmentService.getQrDataUrl(this.publicSlug).subscribe({
        next: (data) => (this.qrData = data),
        error: () => {},
      });
    }
  }

  generateSlug() {
    this.publicSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  addSection(type: SectionType) {
    const defaults: Record<SectionType, Record<string, string>> = {
      wifi: { network: '', password: '' },
      entry: { text: '' },
      rules: { text: '' },
      contact: { name: '', phone: '', email: '' },
      laundry: { text: '', link: '' },
      custom: { title: '', text: '' },
      link: { label: '', url: '' },
    };

    const typeLabel = this.sectionTypes.find((t) => t.value === type)?.label ?? type;

    this.sections.push({
      id: this.generateId(),
      type,
      title: typeLabel,
      content: { ...defaults[type] },
      order: this.sections.length,
    });
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
    this.sections.forEach((s, i) => (s.order = i));
  }

  moveSection(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.sections.length) return;
    const temp = this.sections[index];
    this.sections[index] = this.sections[newIndex];
    this.sections[newIndex] = temp;
    this.sections.forEach((s, i) => (s.order = i));
  }

  getContentKeys(section: Section): string[] {
    return Object.keys(section.content);
  }

  getFieldLabel(key: string): string {
    const labels: Record<string, string> = {
      network: 'Network Name',
      password: 'Password',
      text: 'Text',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      link: 'Link URL',
      label: 'Link Label',
      url: 'URL',
      title: 'Title',
    };
    return labels[key] || key;
  }

  isTextArea(key: string): boolean {
    return key === 'text';
  }

  save() {
    if (!this.title || !this.publicSlug || !this.buildingId) return;

    this.saving = true;
    const data: Partial<Apartment> = {
      title: this.title,
      publicSlug: this.publicSlug,
      buildingId: this.buildingId,
      sections: this.sections,
    };

    const req = this.isNew
      ? this.apartmentService.create(data)
      : this.apartmentService.update(this.apartmentId, data);

    req.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.saving = false;
        alert('Failed to save. The slug may already be in use.');
      },
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
