import {Order} from '../../Screen/Models/order.model';

export const WAITING_LIST_STATE_NAME = 'waiting-list';

export interface WaitingListState {
  contents: Order[];
  pageNumber: number;
  last: boolean;
  isLoading: boolean;
  currentOrder: Order | null;
}
