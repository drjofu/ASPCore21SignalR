import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParkhaeuserComponent } from './parkhaeuser/parkhaeuser.component';
import { BenzinpreiseComponent } from './benzinpreise/benzinpreise.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'parken', component: ParkhaeuserComponent},
  { path: 'benzin', component: BenzinpreiseComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
