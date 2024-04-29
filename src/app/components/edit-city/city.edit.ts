import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ICity} from "../../models/city";
import {CitiesService} from "../../services/cities.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-city-edit',
  templateUrl: './city.edit.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CityEdit implements OnChanges {
  @Input() city: ICity;
  nameControl = new FormControl("", Validators.required);
  urlControl = new FormControl("", Validators.required);

  form: FormGroup = new FormGroup<any>({
    name: this.nameControl,
    url: this.urlControl
  })

  @Output() cityChanged = new EventEmitter();

  constructor(private citiesService: CitiesService) {
  }

  onFormSubmit() {

    this.city.logoUrl = this.form.value.url
    this.city.name = this.form.value.name

    this.citiesService.updateCity(this.city).subscribe({
      next: (updatedData) => {
        this.cityChanged.emit('');
        console.log('Обновленные данные:', updatedData);
      },
      error: (error) => {
        console.error('Ошибка при обновлении данных:', error);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.city) {
      const value = changes.city.currentValue;
      if (value !== undefined && value !== null) {
        this.nameControl.setValue(value.name);
        this.urlControl.setValue(value.logoUrl);
      }
    }
  }
}

