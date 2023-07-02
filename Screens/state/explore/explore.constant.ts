import {Product} from '../../Screen/Models/product.model';

export const EXPLORE_STATE_NAME = 'explore';

export interface ExploreState {
  productList: Product[] | null;
  pageNumber: number | null;
  isLast: boolean;
  isLoading: boolean;
}
