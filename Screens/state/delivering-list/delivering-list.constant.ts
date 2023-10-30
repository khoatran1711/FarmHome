import {Order} from '../../Screen/Models/order.model';

export const DELIVERY_LIST_STATE_NAME = 'delivery-list';

export interface DeliveryListState {
  contents: Order[];
  pageNumber: number;
  last: boolean;
  isLoading: boolean;
  currentOrder: Order | null;
}
