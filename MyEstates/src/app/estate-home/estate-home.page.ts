import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Estate } from '../models/estate.model';
import { EstateDetails } from '../models/estate_details.model';
import { LocationData } from '../models/location_data.model';
import { EstatesService } from "../providers/estates.service";
import { AlertController } from '@ionic/angular';
import _ from 'lodash';

@Component({
  selector: 'app-estate-home',
  templateUrl: './estate-home.page.html',
  styleUrls: ['./estate-home.page.scss'],
})
export class EstateHomePage implements OnInit {
  locationData: LocationData;
  currentEstate: Estate;
  private savedEstates: EstateDetails[];
  public isSaved = false;
  public isLoading = false;

  constructor(private estateService: EstatesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private storage: Storage,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController
  ) { }
  ngOnInit(): void {
    const locationId = this.activatedRoute.snapshot.paramMap.get("locationId")
    const estateId: number = parseInt(this.activatedRoute.snapshot.paramMap.get("estateId"))
    this.estateService.getLocationData(locationId).subscribe(info => {
      this.locationData = info
      this.currentEstate = _.filter(this.locationData.estates, el => el.id === estateId)[0]
      this.storage.get("savedEstates").then(saved => {
        if (saved !== null) {
          this.savedEstates = saved
          this.isSaved = _.filter(saved, el => el.estate.id === estateId).length != 0
        }
        else
          this.savedEstates = []
      })
    })
  }
  public goToMap(locationId: string, estateId: string): void {
    this.router.navigate(['/map', locationId, estateId]);
  }
  public goToSimilar(locationId: string, estateId: string): void {
    this.router.navigate(['/similar', locationId, estateId]);
  }
  public goHome(): void {
    this.router.navigate(['/']);
  }
  doRefresh(event: { target: { complete: () => void; }; }): void {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  public onSaveButtonClick(): void {
    const estateDetails: EstateDetails = {
      location: this.locationData.location,
      estate: this.currentEstate
    }
    this.savedEstates.push(estateDetails)
    this.isLoading = true
    this.storage.set('savedEstates', this.savedEstates).then(() => {
      this.isSaved = true;
      this.isLoading = false;
    })
  }

  public onRemoveButtonClicked(): void {
    this.presentAlertConfirm()
  }

  async presentAlertConfirm(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to remove from saved estates?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Remove canceled');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.isSaved = false;
            const currentId = this.currentEstate.id
            this.savedEstates = this.savedEstates.filter(function (el: EstateDetails) {
              return el.estate.id != currentId
            })
            this.isLoading = true;
            this.storage.set('savedEstates', this.savedEstates).then(() => {
              this.isLoading = false;
            })

            this.createToastForError("Removed successfully")
          }
        }
      ]
    });
    await alert.present();
  }
  private async createToastForError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
