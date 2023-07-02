import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  WaitingListState,
  WAITING_LIST_STATE_NAME,
} from './waiting-list.constant';
import {Order} from '../../Screen/Models/order.model';

const initialState: WaitingListState = {
  contents: [],
  pageNumber: -1,
  last: false,
  isLoading: false,
  currentOrder: null,
};

export const WaitingListSlice = createSlice({
  name: WAITING_LIST_STATE_NAME,
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

export const WaitingListReducer = WaitingListSlice.reducer;
export const WaitingListActions = WaitingListSlice.actions;
