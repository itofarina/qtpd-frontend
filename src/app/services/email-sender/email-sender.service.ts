import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// configuration
import { environment } from '../../../environments/environment';
import { CONFIG } from '../../config/config';

// models
import { EmailMessage } from '../../models/email-message';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  constructor(private http: HttpClient) { }

  sendEmail(emailMessage: EmailMessage): Observable<any> {
    // sends the email
    const url = environment.APIEndpoint + '/' + CONFIG.apiUri.email;
    return this.http.post(url, emailMessage).pipe(map((response: any) => {
      console.log('Response from send email', response);
      if (response.success) {
        return response;
      }
      throw new Error(`Error en la api enviando el email. Error: ${response.error}`);
    }), catchError(error => {
      return throwError(error);
    }));

  }
}
