import { Component, OnInit } from '@angular/core';
import { EstatesService } from "../providers/estates.service";
import { ActivatedRoute } from "@angular/router";
import { LocationData } from '../models/location_data.model';
import { Estate } from '../models/estate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estate-home',
  templateUrl: './estate-home.page.html',
  styleUrls: ['./estate-home.page.scss'],
})
export class EstateHomePage implements OnInit {
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
    })
  }
  public goToMap(locationId: string, estateId: string) {
    this.router.navigate(['/map', locationId, estateId]);
  }

}
