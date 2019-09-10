import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { AgmCoreModule } from '@agm/core';
import { DataTableModule } from 'angular-6-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        NavBarComponent,
    ],
    imports: [
        AgmCoreModule,
        DataTableModule,
        ModalModule.forRoot(),
        RouterModule,
        TranslateModule
    ],
    providers: [],
    exports: [
        NavBarComponent,
        // Modules
        AgmCoreModule,
        DataTableModule,
        ModalModule,
        TranslateModule
    ]
})
export class SharedModule { }
