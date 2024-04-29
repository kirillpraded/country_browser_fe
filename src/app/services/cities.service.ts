import {Injectable} from "@angular/core";
import {ICity, ICityPaged} from "../models/city";
import axios from "axios";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private httpClient: HttpClient) {
  }

  async getCitiesPage(page?: number): Promise<ICityPaged> {
    const resp = await axios.get<ICityPaged>('http://localhost:8080/api/v1/cities', {
      params: {
        page,
        size: 6
      }
    })
    return resp.data
  }

  async getCitiesWithParams(page?: number, cityname?: string, countryname?:string): Promise<ICityPaged> {
    const resp = await axios.get<ICityPaged>('http://localhost:8080/api/v1/cities', {
      params: {
        page,
        size: 6,
        city: cityname,
        country: countryname
      }
    })
    return resp.data
  }

  updateCity(city: ICity) {
    console.log(city)
    return this.httpClient.put('http://localhost:8080/api/v1/cities/update', {
      id: city.id,
      name: city.name,
      imageUrl: city.logoUrl
    })
  }

}
