import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { ApartmentWithBuilding } from '../../models/apartment.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private apartmentService = inject(ApartmentService);
  private router = inject(Router);

  apartments: ApartmentWithBuilding[] = [];
  loading = true;

  ngOnInit() {
    this.loadApartments();
  }

  loadApartments() {
    this.loading = true;
    this.apartmentService.getAll().subscribe({
      next: (data) => {
        this.apartments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  editApartment(id: string) {
    this.router.navigate(['/apartment', id, 'edit']);
  }

  createApartment() {
    this.router.navigate(['/apartment', 'new']);
  }

  deleteApartment(apt: ApartmentWithBuilding) {
    if (!confirm(`Delete "${apt.title}"?`)) return;
    this.apartmentService.delete(apt.id).subscribe(() => {
      this.apartments = this.apartments.filter((a) => a.id !== apt.id);
    });
  }

  openPublicPage(slug: string) {
    window.open(`/a/${slug}`, '_blank');
  }

  getBuildingCount(): number {
    return new Set(this.apartments.map((a) => a.buildingId)).size;
  }

  getTotalSections(): number {
    return this.apartments.reduce((sum, a) => sum + a.sections.length, 0);
  }

  getQrUrl(slug: string): string {
    return this.apartmentService.getQrImageUrl(slug);
  }

  downloadQr(slug: string, title: string) {
    const url = this.apartmentService.getQrImageUrl(slug);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-${slug}.png`;
    link.click();
  }
}
