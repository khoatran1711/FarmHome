import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../Screen/Models/product.model';

import {ExploreState, EXPLORE_STATE_NAME} from './explore.constant';

const initialState: ExploreState = {
  productList: null,
  pageNumber: null,
  isLast: false,
  isLoading: false,
};

export const ExploreSlice = createSlice({
  name: EXPLORE_STATE_NAME,
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
  },
});

export const ExploreReducer = ExploreSlice.reducer;
export const ExploreActions = ExploreSlice.actions;
