import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { HowDoesItWorkComponent } from './how-does-it-work/how-does-it-work.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { ContactUsComponent } from './contact/contact-us.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SearchCenterComponent } from './search-center/search-center.component';

const pagesRoutes: Routes = [
    { path: '', component: MapComponent, pathMatch: 'full', data: { title: 'Mapa de instituciones solidarias' } },
    { path: 'contact', component: ContactUsComponent, data: { title: 'Contacto' } },
    { path: 'how-does-it-work', component: HowDoesItWorkComponent, data: { title: '¿Cómo funciona?' } },
    { path: 'who-we-are', component: WhoWeAreComponent, data: { title: '¿Quiénes somos?' } },
    { path: 'busqueda', component: SearchCenterComponent, data: { title: 'Búsqueda de centros' } },
    { path: '**', component: NoPageFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
