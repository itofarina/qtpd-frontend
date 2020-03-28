import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// constants
import { CONFIG } from '../../config/config';
// services
import { DonationTypesService } from '../donation-types/donation-types.service';
// models
import { Center, LocationLatLng } from '../../models/center';
import { CenterFilter } from '../../models/center-filter';
import { CenterTypeEnum } from '../../models/enums';

@Injectable({
    providedIn: 'root'
})

export class CentersService {

    centers: Center[] = [];

    constructor(
        private http: HttpClient,
        public _donationTypesService: DonationTypesService
    ) { }

    getIconUrlOfCenter(center: Center): string {
        switch (center.centerType) {
            case CenterTypeEnum.AnimalRefuge:
                return CONFIG.iconUrls.animals;
            case CenterTypeEnum.Home:
                return CONFIG.iconUrls.home;
            case CenterTypeEnum.Organization:
                return CONFIG.iconUrls.organization;
            case CenterTypeEnum.ReligiousCenter:
                return CONFIG.iconUrls.religious;
            case CenterTypeEnum.School:
                return CONFIG.iconUrls.school;
            case CenterTypeEnum.Olla:
                return CONFIG.iconUrls.olla;
            default:
                return CONFIG.iconUrls.organization;
        }
    }

    // ================================================
    // API requests
    // ================================================
    getAllCenters(): Observable<any> {
        const url = environment.APIEndpoint + '/' + CONFIG.apiUri.centers;
        return this.http.get(url).pipe(map((centersResponse: any) => {
            if (centersResponse.success) {
                return centersResponse.data.map(c => this.parseCenterFromApiModel(c));
            } else {
                console.error('Ocurrió un error obteniendo los centros. Por favor inténtelo nuevamente.');
            }
        }), catchError(error => {
            return error;
        }));
    }

    getFilteredCenters(filter: CenterFilter): Observable<any> {
        const url = `${environment.APIEndpoint}/${CONFIG.apiUri.filteredCenters}` +
            `/${filter.locationLatLng.latitude}/${filter.locationLatLng.longitude}/${filter.maxDistance}/${filter.donationTypes.join(',')}`;

        return this.http.get(url).pipe(map((centersResponse: any) => {
            if (centersResponse.success) {
                return centersResponse.data.map(c => this.parseCenterFromApiModel(c));
            } else {
                console.error('Ocurrió un error obteniendo los centros filtrados. Por favor inténtelo nuevamente.');
            }
        }), catchError(error => {
            return error;
        }));
    }

    searchCentersByQuery(query = ''): Observable<any> {
        const url = `${environment.APIEndpoint}/${CONFIG.apiUri.searchCentersByQuery}`;
        return this.http.post(url, { query }).pipe(map((centersResponse: any) => {
            if (centersResponse.success) {
                return centersResponse.data.map(c => this.parseCenterFromApiModel(c));
            } else {
                console.error('Ocurrió un error obteniendo los centros filtrados. Por favor inténtelo nuevamente.');
            }
        }), catchError(error => {
            return error;
        }));
    }

    searchCentersByType(centerType = ''): Observable<any> {
        const url = `${environment.APIEndpoint}/${CONFIG.apiUri.searchCentersByType}?centerType=${centerType}`;

        return this.http.get(url).pipe(map((centersResponse: any) => {
            if (centersResponse.success) {
                return centersResponse.data.map(c => this.parseCenterFromApiModel(c));
            } else {
                console.error('Ocurrió un error obteniendo los centros filtrados. Por favor inténtelo nuevamente.');
            }
        }), catchError(error => {
            return error;
        }));
    }

    private parseCenterFromApiModel(apiCenter): Center {
        const donationTypes = apiCenter.donationTypes.map(d => this._donationTypesService.parseFromApi(d));
        const centerLocation = new LocationLatLng(apiCenter.loc.coordinates[1], apiCenter.loc.coordinates[0]);

        return new Center(apiCenter.apartmentNumber,
            apiCenter.centerType,
            apiCenter.city,
            apiCenter.department,
            apiCenter.description,
            donationTypes, apiCenter.doorNumber,
            apiCenter.email, centerLocation,
            apiCenter.name, apiCenter.phone,
            apiCenter.street,
            apiCenter.workingHours,
            apiCenter.zipCode, apiCenter._id);
    }
}
