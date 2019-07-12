import { DonationType } from './donation-type';
import { CenterTypeEnum } from './enums';

export class Center {
    constructor(
        public apartmentNumber = '',
        public centerType: CenterTypeEnum = CenterTypeEnum.Organization,
        public city = '',
        public department = '',
        public description = '',
        public donationTypes: DonationType[] = [],
        public doorNumber = '',
        public email = '',
        public location: LocationLatLng = new LocationLatLng(),
        public name = '',
        public phone = '',
        public street = '',
        public workingHours = '',
        public zipCode: number = 0,
        public _id = ''
    ) { }
}

export class LocationLatLng {
    constructor(
        public latitude: number = -34.9050033,
        public longitude: number = -56.1373682
    ) { }
}
