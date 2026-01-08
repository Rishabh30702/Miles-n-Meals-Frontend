import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { AboutComponent } from './components/layout/about/about.component';
import { LocationsComponent } from './components/layout/locations/locations.component';
import { LoginComponent } from './components/layout/login/login.component';
import { ContactsComponent } from './components/layout/contacts/contacts.component';

// Client Side Import
import { ClientComponent } from './components/layout/client/client.component';

// Admin Imports
import { AdminLayoutComponent } from './components/layout/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/layout/admin/dashboard/dashboard.component';
import { DailySalesComponent } from './components/layout/admin/daily-sales/daily-sales.component';
import { SalesHistoryComponent } from './components/layout/admin/sales-history/sales-history.component';
import { ReportsComponent } from './components/layout/admin/reports/reports.component';

export const routes: Routes = [
  // --- Public Routes ---
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },

  // --- Client Side Dashboard (Single Page) ---
  { path: 'client', component: ClientComponent },

  // --- Admin Routes (Nested) ---
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'daily-sales', component: DailySalesComponent },
      { path: 'sales-history', component: SalesHistoryComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // --- Wildcard Route ---
  // Redirects any unknown URL back to Home. Must remain at the bottom.
  { path: '**', redirectTo: '' }
];