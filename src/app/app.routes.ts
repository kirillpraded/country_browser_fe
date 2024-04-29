import { Routes } from '@angular/router';
import {RegistrationComponent} from "./components/registration/registration.component";
import {CitiesListComponent} from "./components/cities-list/cities-list.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationPageGuard} from "./services/guards/non.authenticated.guard";

export const routes: Routes = [
  {path: 'registration', component: RegistrationComponent, canActivate: [AuthenticationPageGuard]},
  {path: 'cities', component: CitiesListComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthenticationPageGuard]},
];
