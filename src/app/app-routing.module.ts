import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./house-list/house-list.module').then(x => x.HouseListModule)
  },
  {
    path: 'visited',
    loadChildren: () => import('./visited/visited.module').then(x => x.VisitedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
