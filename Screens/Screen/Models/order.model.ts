import {Location} from './farmer.model';
import {Product} from './product.model';
import {User} from './user.model';

export const URL_GET_ALL_ORDERS = 'order/merchant';
export const URL_GET_ORDERS = 'order/';
export const URL_ORDERS_ACCEPT = 'order/resend';
export const URL_GET_ALL_ORDERS_HISTORY = 'history/user/';
export const URL_GET_ALL_ORDER_DETAIL = 'history/';
export const URL_DELETE_ORDER_DETAIL = 'order/cancel/';

export interface Order {
  id: number;
  fruit: Product;
  farmer: User;
  merchant: User;
  price: number;
  date: string;
  transport: boolean;
  dealAmount?: number | null;
  dealPrice?: number | null;
  amount: number;
  status: {
    id: number;
    name: string;
  };
  deliveryLocation?: Location;
}

export interface GetAllOrderResponse {
  contents: Order[];
  totalPages: number;
  totalItems: number;
  sizeCurrentItems: number;
  numberOfCurrentPage: number;
  first: boolean;
  last: boolean;
}

export interface GetAllHistoryResponse {
  contents: OrderHistory[];
  totalPages: number;
  totalItems: number;
  sizeCurrentItems: number;
  numberOfCurrentPage: number;
  first: boolean;
  last: boolean;
}

export interface OrderHistory {
  id: number;
  fruit: Product;
  farmer: User;
  merchant: User;
  price: number;
  date: string;
  transport: boolean;
  dealAmount?: number | null;
  dealPrice?: number | null;
  amount: number;
  deliveryLocation?: Location;
}

export enum STATUS_CODE_ORDER {
  PENDING = 'Pending',
  DEALING = 'Dealing',
}
