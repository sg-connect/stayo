import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./manager/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'apartment/new',
    loadComponent: () => import('./manager/apartment-edit/apartment-edit.component').then(m => m.ApartmentEditComponent),
  },
  {
    path: 'apartment/:id/edit',
    loadComponent: () => import('./manager/apartment-edit/apartment-edit.component').then(m => m.ApartmentEditComponent),
  },
  {
    path: 'a/:slug',
    loadComponent: () => import('./public/public-page/public-page.component').then(m => m.PublicPageComponent),
  },
];
