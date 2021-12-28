import {NgModule} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule, Routes} from "@angular/router";
import {MovieAddComponent} from "./admin/movie-add/movie-add.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {MainAdminComponent} from "./admin/main-admin/main-admin.component";
import {AddCinemaComponent} from "./admin/add-cinema/add-cinema.component";

const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'customer', component: LandingComponent},
  {path: 'admin/movies', component: MovieAddComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'admin', component: MainAdminComponent,},
  {path: 'admin/add-cinema', component: AddCinemaComponent}
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
