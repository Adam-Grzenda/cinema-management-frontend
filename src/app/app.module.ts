import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {FilmListComponent} from './film-list/film-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FilmEditComponent} from './admin/film-edit/film-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';
import {FilmAddComponent} from './admin/film-add/film-add.component';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {MainAdminComponent} from './admin/main-admin/main-admin.component';
import {AddCinemaComponent} from './admin/add-cinema/add-cinema.component';
import {AddCinemaHallComponent} from './admin/add-cinema-hall/add-cinema-hall.component';
import {MatSelectModule} from "@angular/material/select";
import {AddAdvertisementComponent} from './admin/add-advertisement/add-advertisement.component';
import {AddPromoOfferComponent} from './admin/add-promo-offer/add-promo-offer.component';
import {AddClientSegmentComponent} from './admin/add-client-segment/add-client-segment.component';
import {AddProductTypeComponent} from './admin/add-product-type/add-product-type.component';
import {FilterComponent} from './sidebar/filter/filter.component';
import {FilmCard} from './film-card/film-card.component';
import {NgxHateoasClientConfigurationService, NgxHateoasClientModule} from "@lagoshny/ngx-hateoas-client";
import {environment} from "../environments/environment";
import {Film} from "../model/film";
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {Cinema} from "../model/cinema";
import {FilmShow} from "../model/film-show";
import { BuyTicketComponent } from './client/buy-ticket/buy-ticket.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CinemaHall} from "../model/cinema-hall";
import {TypeListComponent} from "./admin/type-list/type-list.component";
import { ObjectListComponent } from './admin/object-list/object-list.component';
import { ObjectPanelComponent } from './admin/object-panel/object-panel.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FilmListComponent,
    NavbarComponent,
    SidebarComponent,
    FilmEditComponent,
    FilmAddComponent,
    FilmDetailsComponent,
    FilterComponent,
    FilmCard,
    MainAdminComponent,
    AddCinemaComponent,
    AddCinemaHallComponent,
    AddAdvertisementComponent,
    AddPromoOfferComponent,
    AddClientSegmentComponent,
    AddProductTypeComponent,
    TypeListComponent,
    ObjectListComponent,
    ObjectPanelComponent,
    BuyTicketComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonToggleModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        FormsModule,
        NgxHateoasClientModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatExpansionModule,
        MatDialogModule
    ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
    hateoasConfig.configure(
      {
        http: {
          rootUrl: environment.apiEndpoint
        },
        useTypes: {
          resources: [
            Film,
            Cinema,
            CinemaHall,
            FilmShow
          ]
        }
      }
    )
  }
}
