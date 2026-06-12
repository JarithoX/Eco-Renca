import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'career-selection',
    loadComponent: () => import('./pages/career-selection/career-selection.page').then(m => m.CareerSelectionPage)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
];
