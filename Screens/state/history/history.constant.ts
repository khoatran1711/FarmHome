import {OrderHistory} from '../../Screen/Models/order.model';

export const HISTORY_STATE_NAME = 'history-list';

export interface HistoryState {
  contents: OrderHistory[];
  pageNumber: number;
  last: boolean;
  isLoading: boolean;
  currentHistory: OrderHistory | null;
}
