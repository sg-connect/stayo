import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment, ApartmentWithBuilding, Building, PublicApartment, QrData } from '../models/apartment.model';

@Injectable({ providedIn: 'root' })
export class ApartmentService {
  private http = inject(HttpClient);

  getAll(): Observable<ApartmentWithBuilding[]> {
    return this.http.get<ApartmentWithBuilding[]>('/api/apartments');
  }

  getById(id: string): Observable<ApartmentWithBuilding> {
    return this.http.get<ApartmentWithBuilding>(`/api/apartments/${id}`);
  }

  create(apartment: Partial<Apartment>): Observable<Apartment> {
    return this.http.post<Apartment>('/api/apartments', apartment);
  }

  update(id: string, apartment: Partial<Apartment>): Observable<Apartment> {
    return this.http.put<Apartment>(`/api/apartments/${id}`, apartment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/apartments/${id}`);
  }

  getPublic(slug: string): Observable<PublicApartment> {
    return this.http.get<PublicApartment>(`/api/public/${slug}`);
  }

  getQrDataUrl(slug: string): Observable<QrData> {
    return this.http.get<QrData>(`/api/qr/${slug}/data`);
  }

  getQrImageUrl(slug: string): string {
    return `/api/qr/${slug}`;
  }

  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>('/api/apartments/buildings/list');
  }
}
