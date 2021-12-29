import {NgModule} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule, Routes} from "@angular/router";
import {MovieAddComponent} from "./admin/movie-add/movie-add.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {MainAdminComponent} from "./admin/main-admin/main-admin.component";
import {AddCinemaComponent} from "./admin/add-cinema/add-cinema.component";
import {AddCinemaHallComponent} from "./admin/add-cinema-hall/add-cinema-hall.component";

const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'customer', component: LandingComponent},
  {path: 'admin/movies', component: MovieAddComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'admin/main', component: MainAdminComponent,},
  {path: 'admin/add-cinema', component: AddCinemaComponent},
  {path: 'admin/add-cinema-hall', component: AddCinemaHallComponent}
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
