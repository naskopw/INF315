import { Component, OnInit } from '@angular/core';
import { Location } from "../models/location.model";

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EstatesService } from "../providers/estates.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  locations: Location[];
  constructor(private estateService: EstatesService,
    private readonly loadingController: LoadingController,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.showLoadBar();
    this.estateService.getLocations().subscribe(locations => {
      this.locations = locations
      this.loadingController.dismiss();
    })
  }

  public async showLoadBar(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
  public locationClick(): void {
    this.router.navigate(['/estates']);
  }
}
