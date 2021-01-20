import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstateHomePage } from './estate-home.page';

const routes: Routes = [
  {
    path: '',
    component: EstateHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateHomePageRoutingModule {}
