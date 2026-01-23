import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'projets',
    loadComponent: () =>
      import('./components/project-page/project-page').then(m => m.ProjectPage),
  },
    {
    path: 'pieces',
    loadComponent: () =>
      import('./components/pieces-page/pieces-page').then(m => m.PiecesPage),
  },
  {
    path: 'recommandations',
    loadComponent: () =>
      import('./components/recommandations-page/recommandations-page').then(m => m.RecommandationsPage),
  },


  // optional: home page
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page').then(m => m.HomePage),
  },
];