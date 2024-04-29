import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly _backendUrl: string;

  constructor() {
    this._backendUrl = 'http://localhost:8080';
  }



  public get backendUrl(): string {
    return this._backendUrl;
  }
}
