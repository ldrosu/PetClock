import {RouterModule, Routes} from '@angular/router';
import {PetFormComponent} from '../app/petForm/petForm.component';
import {SettingsComponent} from '../app/settings/settings.component';
import {HomeComponent} from '../app/home/home.component';
import {AboutComponent} from '../app/about/about.component';

import { NgModule } from '@angular/core';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'petinfo', component: PetFormComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
