import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
// External modules
import { MatSliderModule } from '@angular/material/slider';

// Components
import { FiltersComponent } from './filters/filters.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { CenterInfoComponent } from './center-info/center-info.component';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { FooterNoMapComponent } from './footer-no-map/footer-no-map.component';
import { FooterMapComponent } from './footer-map/footer-map.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        // external modules
        MatSliderModule
    ],
    declarations: [
        CenterInfoComponent,
        ContactUsFormComponent,
        FiltersComponent,
        FooterNoMapComponent,
        WelcomeModalComponent,
        FooterMapComponent
    ],
    exports: [
        FormsModule,
        // external modules
        MatSliderModule,
        // components
        CenterInfoComponent,
        ContactUsFormComponent,
        FiltersComponent,
        FooterMapComponent,
        FooterNoMapComponent,
        WelcomeModalComponent
    ]
})
export class ComponentsModule { }
