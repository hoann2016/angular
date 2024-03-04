import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
