import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {FilmListComponent} from './landing/film-list/film-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './landing/sidebar/sidebar.component';
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
import {FilmDetailsComponent} from './film/film-details/film-details.component';
import {MainAdminComponent} from './admin/main-admin/main-admin.component';
import {AddCinemaComponent} from './admin/add-cinema/add-cinema.component';
import {AddCinemaHallComponent} from './admin/add-cinema-hall/add-cinema-hall.component';
import {MatSelectModule} from "@angular/material/select";
import {AddAdvertisementComponent} from './admin/add-advertisement/add-advertisement.component';
import {AddPromoOfferComponent} from './admin/add-promo-offer/add-promo-offer.component';
import {AddClientSegmentComponent} from './admin/add-client-segment/add-client-segment.component';
import {AddProductTypeComponent} from './admin/add-product-type/add-product-type.component';
import {FilterComponent} from './landing/sidebar/filter/filter.component';
import {FilmCard} from './film/film-card/film-card.component';
import {NgxHateoasClientConfigurationService, NgxHateoasClientModule} from "@lagoshny/ngx-hateoas-client";
import {environment} from "../environments/environment";
import {Film} from "../model/film";
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {Cinema} from "../model/cinema";
import {FilmShow} from "../model/film-show";
import { BuyTicketComponent } from './client/buy-ticket/buy-ticket.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {Chair} from "../model/chair";
import {CinemaHall} from "../model/cinema-hall";
import {TypeListComponent} from "./type-list/type-list.component";
import { ObjectPanelComponent } from './object-panel/object-panel.component';
import { MainManagerComponent } from './manager/main-manager/main-manager.component';
import { CinemaChooseComponent } from './manager/cinema-choose/cinema-choose.component';
import {MatSortModule} from "@angular/material/sort";
import { ChairsTableComponent } from './manager/chairs-table/chairs-table.component';
import {Advertisement} from "../model/advertisement";
import {PromoOffer} from "../model/promo-offer";
import {ProductType} from "../model/product-type";
import {ClientSegment} from "../model/client-segment";
import {MatTableModule} from "@angular/material/table";
import { AddFoodCourtComponent } from './manager/add-food-court/add-food-court.component';
import { FoodCourtProductTypeComponent } from './manager/food-court-product-type/food-court-product-type.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {OAuthModule} from "angular-oauth2-oidc";



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
    ObjectPanelComponent,
    BuyTicketComponent,
    MainManagerComponent,
    CinemaChooseComponent,
    ChairsTableComponent,
    AddFoodCourtComponent,
    FoodCourtProductTypeComponent,
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
        MatDialogModule,
        MatStepperModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        OAuthModule.forRoot(
        {resourceServer: {
            allowedUrls: ['http://localhost:8080/'],
            sendAccessToken: true
          }}
        )
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
            FilmShow,
            Chair,
            Advertisement,
            PromoOffer,
            ProductType,
            ClientSegment,

          ]
        }
      }
    )
  }
}
