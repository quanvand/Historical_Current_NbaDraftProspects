import { Routes } from '@angular/router';
import { PlayerTableComponent } from './components/player-table/player-table.component';

export const routes: Routes = [
  { path: '', component: PlayerTableComponent }, // Default route
  { path: 'player-table', component: PlayerTableComponent }, // Explicit route
];
