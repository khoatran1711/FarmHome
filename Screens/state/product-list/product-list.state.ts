import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../Screen/Models/product.model';

import {
  ProductListState,
  PRODUCT_LIST_STATE_NAME,
} from './product-list.constant';

const initialState: ProductListState = {
  productList: null,
  pageNumber: null,
  isLast: false,
  isLoading: false,
  totalItems: 0,
};

export const ProductListSlice = createSlice({
  name: PRODUCT_LIST_STATE_NAME,
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLast: (state, action: PayloadAction<boolean>) => {
      state.isLast = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const ProductListReducer = ProductListSlice.reducer;
export const ProductListActions = ProductListSlice.actions;
