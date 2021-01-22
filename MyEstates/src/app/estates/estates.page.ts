import { Component, OnInit } from '@angular/core';
import { LocationData } from "../models/location_data.model";
import { EstatesService } from "../providers/estates.service";

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-estates',
  templateUrl: './estates.page.html',
  styleUrls: ['./estates.page.scss'],
})
export class EstatesPage implements OnInit {
  locationsData: LocationData[];
  constructor(private estateService: EstatesService,
    private readonly loadingController: LoadingController,
    private readonly router: Router) { }

  ngOnInit() {
    this.showLoadBar();
    this.estateService.getLocationsData().subscribe(locationsData => {
      this.locationsData = Object.values(locationsData);
      this.loadingController.dismiss();
    })
  }
  public goToDetails(locationId: string, estateId: string) {
    this.router.navigate(['/estate-home', locationId, estateId]);
  }

  public async showLoadBar() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
  }

}
