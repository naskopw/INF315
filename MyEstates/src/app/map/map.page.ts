import { Component, OnInit } from '@angular/core';
import { EstatesService } from "../providers/estates.service";
import { ActivatedRoute } from "@angular/router";
import { LocationData } from '../models/location_data.model';
import { Estate } from '../models/estate.model';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any = {};
  locationData: LocationData;
  currentEstate: Estate;

  constructor(private estateService: EstatesService,
    private activatedRoute: ActivatedRoute,
    private readonly router: Router) { }
  
  ngOnInit() {
    const locationId = this.activatedRoute.snapshot.paramMap.get("locationId")
    const estateId: number = parseInt(this.activatedRoute.snapshot.paramMap.get("estateId"))
    this.estateService.getLocationData(locationId).subscribe(info => {
      this.locationData = info
      function checkId(el: Estate) {
        return el.id == estateId;
      }
      this.currentEstate = Object.values(this.locationData.estates).filter(checkId)[0]
      this.map = {
        lat: this.currentEstate.latitude,
        lng: this.currentEstate.longitude,
        zoom: 12,
        markerLabel: this.currentEstate.region 
      };
    })
  }
  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }
  public goToOverview(locationId: string, estateId: string) {
    this.router.navigate(['/estate-home', locationId, estateId]);
  }
  public goToSimilar(locationId: string, estateId: string) {
    this.router.navigate(['/similar', locationId, estateId]);
  }
}
