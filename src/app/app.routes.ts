import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Random} from './random/random';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'random', component: Random}
];
