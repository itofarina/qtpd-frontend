import { LocationLatLng } from './center';

export class CenterFilter {
    constructor(
        public donationTypes: string[] = [],
        public locationLatLng: LocationLatLng = new LocationLatLng(),
        public maxDistance: number = 100
    ) { }
}

export class DonationsAndDistanceFilter {
    constructor(public donationTypes: string[] = [], public maxDistance = 100) { }
}
