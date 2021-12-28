import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MovieEditComponent } from './admin/movie-edit/movie-edit.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { MovieAddComponent } from './admin/movie-add/movie-add.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {path: "admin/movies", component: MovieEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MovieListComponent,
    NavbarComponent,
    SidebarComponent,
    MovieEditComponent,
    MovieAddComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
