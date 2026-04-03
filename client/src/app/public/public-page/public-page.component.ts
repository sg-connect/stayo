import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApartmentService } from '../../services/apartment.service';
import { SectionRendererComponent } from '../../shared/section-renderer/section-renderer.component';
import { PublicApartment } from '../../models/apartment.model';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [CommonModule, SectionRendererComponent],
  templateUrl: './public-page.component.html',
  styleUrl: './public-page.component.scss',
})
export class PublicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apartmentService = inject(ApartmentService);

  apartment: PublicApartment | null = null;
  loading = true;
  error = false;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.apartmentService.getPublic(slug).subscribe({
      next: (data) => {
        this.apartment = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
