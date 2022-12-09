import {Farmer} from './farmer.model';

export const URL_GET_ALL_PRODUCT = 'fruit/';
export const URL_SEARCH_PRODUCT = 'fruit/search';
export const URL_GET_FRUIT_BY_FARMER = 'fruit/farmer/';

export interface Product {
  id: number;
  name: string;
  weight: number;
  unit: string;
  imageFile: string;
  image: string;
  date: string | Date;
  farmer: Farmer;
}

export interface ProductResponse {
  contents: Product[];
}
