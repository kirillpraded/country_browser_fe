import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ICity} from '../../models/city';
import {CitiesService} from "../../services/cities.service";
import {NgForOf, NgIf} from "@angular/common";
import {CityEdit} from "../edit-city/city.edit";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-cities-list',
  standalone: true,
  providers: [],
  imports: [
    NgForOf,
    NgIf,
    CityEdit,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cities-list.component.html'
})
export class CitiesListComponent implements OnInit {
  cities: ICity[] = [];
  citiesStorage: ICity[];
  page = 1;
  totalPages = 10;
  selectedCity: ICity | undefined;
  displayUnique: boolean = false;
  isFiltered: boolean = false;

  cityNameControl = new FormControl("");
  countryNameControl = new FormControl("");

  searchForm: FormGroup = new FormGroup<any>({
    cityName: this.cityNameControl,
    countryName: this.countryNameControl
  })

  constructor(
    private citiesService: CitiesService
  ) {

  }

  editCity(city: ICity) {
    if (city === this.selectedCity) {
      this.selectedCity = undefined
    } else {
      this.selectedCity = undefined
      setTimeout(() => {
        this.selectedCity = city;
      }, 1)
    }
  }


  onPageChange(page: number) {
    this.page = page + 1
    this.initCities(page)
  }

  ngOnInit(): void {
    this.initCities()
  }

  initCities(page?: number): void {
    if (this.searchForm.value.cityName || this.searchForm.value.countryName) {
      this.citiesService.getCitiesWithParams(0, this.searchForm.value.cityName, this.searchForm.value.countryName).then(data => {
        this.cities = data.cities
        this.totalPages = data.totalPages
        this.isFiltered = true
      })
    } else {
      this.isFiltered = false
      this.page = 1
      this.citiesService.getCitiesPage(0).then(data => {
        this.cities = data.cities
        this.totalPages = data.totalPages
      })
      this.displayUniqueChange()
    }
  }

  cityUpdated(event: any) {
    this.selectedCity = undefined
    this.initCities(this.page - 1)
  }

  displayUniqueChange() {
    if (this.displayUnique) {
      this.citiesStorage = this.cities
      const uniqueCitiesMap: Map<string, ICity> = new Map()
      this.cities.forEach(city => {
        if (!uniqueCitiesMap.has(city.name)) {
          uniqueCitiesMap.set(city.name, city)
        }
      })
      this.cities = Array.from(uniqueCitiesMap.values())
    } else {
      this.cities = this.citiesStorage
    }
  }

  onSearchFormSubmit() {
    if (this.searchForm.value.cityName || this.searchForm.value.countryName) {
      this.citiesService.getCitiesWithParams(0, this.searchForm.value.cityName, this.searchForm.value.countryName).then(data => {
        this.cities = data.cities
        this.totalPages = data.totalPages
        this.isFiltered = true
      })
    } else {
      this.initCities(0)
      this.isFiltered = false
    }
  }
}
