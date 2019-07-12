import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Local services
import { CentersService, DonationTypesService, EmailSenderService } from './services.index';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        CentersService,
        DonationTypesService,
        EmailSenderService
    ],
    declarations: []
})
export class ServicesModule { }
