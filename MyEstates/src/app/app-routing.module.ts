import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EstateHomePage } from './estate-home/estate-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-estates',
    pathMatch: 'full'
  },
  {
    path: 'my-estates',
    loadChildren: () => import('./my-estates/my-estates.module').then( m => m.MyEstatesPageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'estates',
    loadChildren: () => import('./estates/estates.module').then( m => m.EstatesPageModule)
  },
  {
    path: 'estate-home',
    children: 
    [
      {
        path:':locationId/:estateId',
        loadChildren: () => import('./estate-home/estate-home.module').then( m => m.EstateHomePageModule)
      }
    ]
  },
  {
    path: 'map',
    children: 
    [
      {
        path:':locationId/:estateId',
        loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
