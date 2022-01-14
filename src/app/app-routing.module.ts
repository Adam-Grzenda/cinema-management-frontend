import {NgModule} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule, Routes} from "@angular/router";
import {FilmAddComponent} from "./admin/film-add/film-add.component";
import {FilmDetailsComponent} from "./film/film-details/film-details.component";
import {MainAdminComponent} from "./admin/main-admin/main-admin.component";
import {AddCinemaComponent} from "./admin/add-cinema/add-cinema.component";
import {AddCinemaHallComponent} from "./admin/add-cinema-hall/add-cinema-hall.component";
import {AddAdvertisementComponent} from "./admin/add-advertisement/add-advertisement.component";
import {AddPromoOfferComponent} from "./admin/add-promo-offer/add-promo-offer.component";
import {AddClientSegmentComponent} from "./admin/add-client-segment/add-client-segment.component";
import {AddProductTypeComponent} from "./admin/add-product-type/add-product-type.component";
import {FilmEditComponent} from "./admin/film-edit/film-edit.component";
import {MainManagerComponent} from "./manager/main-manager/main-manager.component";
import {CinemaChooseComponent} from "./manager/cinema-choose/cinema-choose.component";
import {AddFoodCourtComponent} from "./manager/add-food-court/add-food-court.component";
import {FoodCourtProductTypeComponent} from "./manager/food-court-product-type/food-court-product-type.component";
import {AdminGuard} from "./admin-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'customer', component: LandingComponent},
  {path: 'film/:id', component: FilmDetailsComponent},

  {path: 'admin/main', component: MainAdminComponent, canActivate: [AdminGuard]},
  {path: 'admin', redirectTo: 'admin/main', pathMatch: 'full'},

  {path: 'admin/add-cinema', component: AddCinemaComponent},
  {path: 'admin/edit-cinema/:id', component: AddCinemaComponent},

  {path: 'admin/add-cinema-hall', component: AddCinemaHallComponent},
  {path: 'admin/edit-cinema-hall/:id', component: AddCinemaHallComponent},

  {path: 'admin/add-film', component: FilmAddComponent},
  {path: 'admin/edit-film/:id', component: FilmEditComponent},

  {path: 'admin/add-advertisement', component: AddAdvertisementComponent},
  {path: 'admin/edit-advertisement/:id', component: AddAdvertisementComponent},

  {path: 'admin/add-promo-offer', component: AddPromoOfferComponent},
  {path: 'admin/edit-promo-offer/:id', component: AddPromoOfferComponent},

  {path: 'admin/add-client-segment', component: AddClientSegmentComponent},
  {path: 'admin/edit-client-segment/:id', component: AddClientSegmentComponent},

  {path: 'admin/add-product-type', component: AddProductTypeComponent},
  {path: 'admin/edit-product-type/:id', component: AddProductTypeComponent},

  {path: 'manager', component: CinemaChooseComponent},
  {path: 'manager/main', redirectTo: 'manager',pathMatch: 'full'},

  {path: 'manager/main/:cinema-id', component: MainManagerComponent},

  {path: 'manager/add-food-court', component: AddFoodCourtComponent},
  {path: 'manager/edit-food-court/:id', component: AddFoodCourtComponent},

  {path: 'manager/add-food-court-product-type', component: FoodCourtProductTypeComponent},
  {path: 'manager/edit-food-court-product-type/:id', component: FoodCourtProductTypeComponent},



]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
