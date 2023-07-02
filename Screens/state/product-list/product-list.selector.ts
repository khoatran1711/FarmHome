import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {
  ProductListState,
  PRODUCT_LIST_STATE_NAME,
} from './product-list.constant';

const productListStateSelector = (state: RootState): ProductListState =>
  state[PRODUCT_LIST_STATE_NAME];

const productListSelector = createSelector(productListStateSelector, state => {
  return state?.productList;
});

const pageNumberSelector = createSelector(productListStateSelector, state => {
  return state?.pageNumber;
});

const isLastSelector = createSelector(
  productListStateSelector,
  state => state.isLast,
);

const isLoadingSelector = createSelector(
  productListStateSelector,
  state => state.isLoading,
);

const totalItemsSelector = createSelector(
  productListStateSelector,
  state => state.totalItems,
);

export const ProductListSelectors = {
  isLastSelector,
  isLoadingSelector,
  pageNumberSelector,
  productListSelector,
  totalItemsSelector,
};
