import {NgModule} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule, Routes} from "@angular/router";
import {FilmAddComponent} from "./admin/film-add/film-add.component";
import {FilmDetailsComponent} from "./film-details/film-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/customer', pathMatch: 'full'},
  {path: 'customer', component: LandingComponent},
  {path: 'admin/movies', component: FilmAddComponent},
  {path: 'movie/:id', component: FilmDetailsComponent}
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
