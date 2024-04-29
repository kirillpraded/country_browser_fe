import { ICountry } from "./country";

export interface ICity {
    id: string;
    name: string;
    logoUrl: string;
    country: ICountry;
}
export interface ICityPaged {
  totalPages: number;
  cities: ICity[];
}
