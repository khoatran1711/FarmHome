import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {HistoryState, HISTORY_STATE_NAME} from './history.constant';
import {OrderHistory} from '../../Screen/Models/order.model';

const initialState: HistoryState = {
  contents: [],
  pageNumber: -1,
  last: false,
  isLoading: false,
  currentHistory: null,
};

export const HistorySlice = createSlice({
  name: HISTORY_STATE_NAME,
  initialState,
  reducers: {
    setContentList: (state, action: PayloadAction<OrderHistory[]>) => {
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
    setCurrentHistory: (state, action: PayloadAction<OrderHistory | null>) => {
      state.currentHistory = action.payload;
    },
  },
});

export const HistoryReducer = HistorySlice.reducer;
export const HistoryActions = HistorySlice.actions;
