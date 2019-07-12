import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { AgmCoreModule } from '@agm/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        NavBarComponent,
        NoPageFoundComponent
    ],
    imports: [
        AgmCoreModule,
        ModalModule.forRoot(),
        RouterModule,
        TranslateModule
    ],
    providers: [],
    exports: [
        NavBarComponent,
        NoPageFoundComponent,
        // Modules
        AgmCoreModule,
        ModalModule,
        TranslateModule
    ]
})
export class SharedModule { }
