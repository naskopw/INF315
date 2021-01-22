import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import{ HttpClient, HttpHeaders} from "@angular/common/http";
import { Location } from "../models/location.model";
import { LocationData } from "../models/location_data.model";
@Injectable({
  providedIn: 'root'
})
export class EstatesService {
  cannotWork: any;
  private _apiUrl:string = "https://myestates-c44c6-default-rtdb.firebaseio.com/";
  
  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this._apiUrl}/locations.json`)
  }
  getLocationsData(): Observable<LocationData[]> {
    return this.http.get<LocationData[]>(`${this._apiUrl}/locations-data.json`)
  }
  getLocationData(locationId: string) : Observable<LocationData> {
    return this.http.get<LocationData>(`${this._apiUrl}/locations-data/${locationId}.json`)
  }
}
