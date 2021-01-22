import type { Estate } from "./estate.model";
import type { Location } from "./location.model";

export interface EstateDetails {
    location: Location;
    estate: Estate;
}