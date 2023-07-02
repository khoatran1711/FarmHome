import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {
  WaitingListState,
  WAITING_LIST_STATE_NAME,
} from './waiting-list.constant';

const waitingListStateSelector = (state: RootState): WaitingListState =>
  state[WAITING_LIST_STATE_NAME];

const waitingListSelector = createSelector(waitingListStateSelector, state => {
  return state?.contents;
});

const pageNumberSelector = createSelector(waitingListStateSelector, state => {
  return state?.pageNumber;
});

const isLastSelector = createSelector(
  waitingListStateSelector,
  state => state.last,
);

const isLoadingSelector = createSelector(
  waitingListStateSelector,
  state => state.isLoading,
);

const currentOrderSelector = createSelector(
  waitingListStateSelector,
  state => state.currentOrder,
);

export const WaitingListSelectors = {
  isLastSelector,
  isLoadingSelector,
  pageNumberSelector,
  waitingListSelector,
  currentOrderSelector,
};
