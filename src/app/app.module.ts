import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// configs
import { GestureConfig } from '@angular/material/core'; // HAMMERJS
import { environment } from '../environments/environment';
import { LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG, AgmCoreModule } from '@agm/core'; // agm

// Components
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  public apiKey: string;
  constructor() {
    this.apiKey = environment.googleMapsApiKey;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
  ],
  imports: [
    AgmCoreModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
