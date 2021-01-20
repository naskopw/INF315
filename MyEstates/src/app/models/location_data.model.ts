import { Location } from "./location.model";
import { Estate } from "./estate.model";
export interface LocationData {
    location: Location;
    estates: Estate[];
}