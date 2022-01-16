import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainAdminComponent} from "./admin/main-admin/main-admin.component";
import {MainManagerComponent} from "./manager/main-manager/main-manager.component";
import {CinemaChooseComponent} from "./manager/cinema-choose/cinema-choose.component";
import {AdminGuard} from "./admin-guard.service";
import {ManagerGuard} from "./manager.guard";
import {OrderListComponent} from "./client/order-list/order-list.component";
import {FilmListComponent} from "./landing/film-list/film-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'customer', pathMatch: 'full'},
  {path: 'customer', component: FilmListComponent},

  {path: 'customer/orders', component: OrderListComponent},

  {path: 'admin/main', component: MainAdminComponent, canActivate: [AdminGuard], data: {
    role: 'admin'
    }},
  {path: 'admin', redirectTo: 'admin/main', pathMatch: 'full'},

  {path: 'manager', component: CinemaChooseComponent, canActivate: [AdminGuard], data: {
    role: 'manager'
    }},
  {path: 'manager/main', redirectTo: 'manager',pathMatch: 'full'},

  {path: 'manager/main/:cinema-id', component: MainManagerComponent, canActivate: [ManagerGuard], data: {
    role: 'manager'
  }},


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
