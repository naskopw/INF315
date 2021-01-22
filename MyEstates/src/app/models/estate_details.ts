import { Estate } from "./estate.model";
import { Location } from "./location.model";

export interface EstateDetails {
    location: Location;
    estate: Estate;
}