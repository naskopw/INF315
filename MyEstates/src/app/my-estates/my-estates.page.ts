import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { EstateDetails } from '../models/estate_details.model';

@Component({
  selector: 'app-my-estates',
  templateUrl: './my-estates.page.html',
  styleUrls: ['./my-estates.page.scss'],
})
export class MyEstatesPage implements OnInit {
  estates: EstateDetails[]

  constructor(private readonly storage: Storage,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.estates = []
    this.storage.get('savedEstates').then(saved => {
      this.estates = saved ? Object.values(saved) : []
    })
  }
  public goToLocations(): void {
    this.router.navigate(['/locations']);
  }

  public goToOverview(locationId: string, estateId: string): void {
    this.router.navigate(['/estate-home', locationId, estateId]);
  }
}
