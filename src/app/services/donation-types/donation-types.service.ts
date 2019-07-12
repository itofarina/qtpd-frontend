import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CONFIG } from '../../config/config';

import { DonationType } from '../../models/donation-type';

@Injectable({
  providedIn: 'root'
})
export class DonationTypesService {

  public donationTypes: DonationType[] = [];

  private _donationTypesSubject = new Subject();
  public donationTypesNewValue = this._donationTypesSubject as Observable<any>;

  constructor(private http: HttpClient) {
    this.getAllDonationTypes().subscribe((dTypesData: DonationType[]) => {
      // load the value in the variable
      this.donationTypes = dTypesData;
      // emit the new value
      this._donationTypesSubject.next(this.donationTypes);
    });
  }

  getAllDonationTypes(): Observable<any> {
    return this.http.get(environment.APIEndpoint + '/' + CONFIG.apiUri.donationTypes).pipe(map((donationTypesResponse: any) => {
      if (donationTypesResponse.success) {
        this.donationTypes = donationTypesResponse.data as DonationType[];
        return this.donationTypes;
      } else {
        throwError('No fue posible obtener los tipos de donaciones del servidor');
      }
    }), catchError(error => {
      return error;
    }));
  }

  parseFromApi(donationTypeApi): DonationType {
    return new DonationType(donationTypeApi.name, donationTypeApi._id);
  }

}
