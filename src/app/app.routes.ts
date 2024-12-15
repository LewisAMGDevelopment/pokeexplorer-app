import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'region/:name', component: AppComponent },
  { path: 'pokemon/:id', component: AppComponent },
  { path: '**', redirectTo: '' }
];