import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {MovieListComponent} from './movie-list/movie-list.component';
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
import {MovieEditComponent} from './admin/movie-edit/movie-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';
import {MovieAddComponent} from './admin/movie-add/movie-add.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MainAdminComponent} from './admin/main-admin/main-admin.component';
import {AddCinemaComponent} from './admin/add-cinema/add-cinema.component';
import {AddCinemaHallComponent} from './admin/add-cinema-hall/add-cinema-hall.component';
import {MatSelectModule} from "@angular/material/select";
import {AddAdvertisementComponent} from './admin/add-advertisement/add-advertisement.component';
import {AddPromoOfferComponent} from './admin/add-promo-offer/add-promo-offer.component';
import {AddClientSegmentComponent} from './admin/add-client-segment/add-client-segment.component';
import {AddProductTypeComponent} from './admin/add-product-type/add-product-type.component';
import {FilterComponent} from './sidebar/filter/filter.component';
import {MovieCardComponent} from './movie-card/movie-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MovieListComponent,
    NavbarComponent,
    SidebarComponent,
    MovieEditComponent,
    MovieAddComponent,
    FilterComponent,
    MovieCardComponent
    MovieDetailsComponent,
    MainAdminComponent,
    AddCinemaComponent,
    AddCinemaHallComponent,
    AddAdvertisementComponent,
    AddPromoOfferComponent,
    AddClientSegmentComponent,
    AddProductTypeComponent,
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
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
