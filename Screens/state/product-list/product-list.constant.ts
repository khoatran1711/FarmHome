import {Product} from '../../Screen/Models/product.model';

export const PRODUCT_LIST_STATE_NAME = 'product-list';

export interface ProductListState {
  productList: Product[] | null;
  pageNumber: number | null;
  totalItems: number;
  isLast: boolean;
  isLoading: boolean;
}
