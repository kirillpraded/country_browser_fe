import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CitiesListComponent} from './components/cities-list/cities-list.component';
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {CountryComponent} from "./components/country/country.component";
import {HeaderComponent} from "./components/header/header.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CitiesListComponent,
    UpperCasePipe,
    TitleCasePipe,
    CountryComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Country Browser';
}
