import {Farmer} from './farmer.model';

export const URL_GET_ALL_PRODUCT = 'fruit/';
export const URL_GET_FILTER_PRODUCT = 'fruit/filter';
export const URL_SEARCH_PRODUCT = 'fruit/search';
export const URL_GET_FRUIT_BY_FARMER = 'fruit/farmer/';
export const URL_ORDER_FRUIT = 'order/create';

export interface Product {
  id: number;
  name: string;
  weight: number;
  remainingWeight: number;
  unit: string;
  imageFile: string;
  images: Image[];
  date: string | Date;
  farmer: Farmer;
  popular: boolean;
  season: string;
  suggestPrice: string;
  description: string;
  category: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface ProductResponse {
  contents: Product[];
  totalPages?: number;
  totalItems?: number;
  sizeCurrentItems?: number;
  numberOfCurrentPage?: number;
  first?: boolean;
  last?: boolean;
}

export interface OrderRequest {
  fruit: {
    id: number;
  };
  farmer: {
    id: number;
  };
  merchant: {
    id: number;
  };
  date?: string;
  price: number;
  amount: number;
  transport: boolean;
  deliveryLocation?:
    | {
        address: string;
        ward: string;
      }
    | {
        id: string;
      };
  status: {
    id: number;
  };
}

export const SEASON_ENUM = {
  Spring: 'Spring',
  Summer: 'Summer',
  Autumn: 'Autumn',
  Winter: 'Winter',
};

export interface FilterProductRequest {
  no: number;
  popular?: boolean;
  limit: number;
  seasonList: string;
  name: string;
  categoryList?: string;
  provinceId?: number | null;
  districtId?: number | null;
}
