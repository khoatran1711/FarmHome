import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  DeliveryListState,
  DELIVERY_LIST_STATE_NAME,
} from './delivering-list.constant';
import {Order} from '../../Screen/Models/order.model';

const initialState: DeliveryListState = {
  contents: [],
  pageNumber: -1,
  last: false,
  isLoading: false,
  currentOrder: null,
};

export const DeliveryListSlice = createSlice({
  name: DELIVERY_LIST_STATE_NAME,
  initialState,
  reducers: {
    setContentList: (state, action: PayloadAction<Order[]>) => {
      state.contents = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLast: (state, action: PayloadAction<boolean>) => {
      state.last = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
  },
});

export const DeliveryListReducer = DeliveryListSlice.reducer;
export const DeliveryListActions = DeliveryListSlice.actions;
