import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstatesService } from '../providers/estates.service';
import { Router } from '@angular/router';
import { Estate } from '../models/estate.model';
import { LocationData } from '../models/location_data.model';
import _ from 'lodash';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.page.html',
  styleUrls: ['./similar.page.scss'],
})
export class SimilarPage implements OnInit {
  locationData: LocationData;
  estate: Estate;
  similar: Estate[];
  allSimilar: Estate[];
  regionFilter = 'region';
  kindFilter = 'all';
  estates: Estate[]
    ;
  similarByType: any;
  useDataFilter = false;

  constructor(
    private estateService: EstatesService,
    private activatedRoute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    const locationId = this.activatedRoute.snapshot.paramMap.get('locationId');
    const estateId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('estateId'));
    this.estateService.getLocationData(locationId).subscribe(info => {
      this.locationData = info;
      this.estate = _.filter(this.locationData.estates, el => el.id === estateId)[0];
      this.similar = _.filter(this.locationData.estates, el => el.id !== estateId);
      this.allSimilar = this.similar;
      this.filterType();
    });
  }

  filterType(): void {
    if (this.regionFilter === 'all') {
      this.similar = this.allSimilar;
      if (this.kindFilter === 'House' && this.useDataFilter === true) {

        this.similarByType = _.filter(this.similar, s => s.type === 'House');
      } else if (this.kindFilter === 'Studio' && this.useDataFilter === true) {
        this.similarByType = _.filter(this.similar, s => s.type === 'Studio');
      }
      else if (this.kindFilter === 'Apartment' && this.useDataFilter === true) {

        this.similarByType = _.filter(this.similar, s => s.type === 'Apartment');
      } else {
        this.similarByType = this.allSimilar;
      }
    } else {
      this.similar = _.filter(this.allSimilar, s => s.region === this.estate.region);
      if (this.kindFilter === 'House' && this.useDataFilter === true) {

        this.similarByType = _.filter(this.similar, s => s.type === 'House');
      } else if (this.kindFilter === 'Studio' && this.useDataFilter === true) {
        this.similarByType = _.filter(this.similar, s => s.type === 'Studio');
      }
      else if (this.kindFilter === 'Apartment' && this.useDataFilter === true) {

        this.similarByType = _.filter(this.similar, s => s.type === 'Apartment');
      } else {
        this.similarByType = this.similar;
      }
    }
  }

  dataChanged(): void {
    this.useDataFilter === !this.useDataFilter;
    if (this.useDataFilter === false) {
      this.filterType();
    }
  }
  getHeader(record: { region: void; }, recordIndex: number, records: { region: any; }[]): void {
    if (recordIndex === 0 || record.region !== records[recordIndex - 1].region) {
      return record.region;
    }
    return null;
  }
  goHome(): void {
    this.router.navigate(['/']);
  }
  public goToOverview(locationId: string, estateId: string): void {
    this.router.navigate(['/estate-home', locationId, estateId]);
  }
  public goToMap(locationId: string, estateId: string): void {
    this.router.navigate(['/map', locationId, estateId]);
  }
}
