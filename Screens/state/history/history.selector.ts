import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {HistoryState, HISTORY_STATE_NAME} from './history.constant';

const historyStateSelector = (state: RootState): HistoryState =>
  state[HISTORY_STATE_NAME];

const historyListSelector = createSelector(historyStateSelector, state => {
  return state?.contents;
});

const pageNumberSelector = createSelector(historyStateSelector, state => {
  return state?.pageNumber;
});

const isLastSelector = createSelector(
  historyStateSelector,
  state => state.last,
);

const isLoadingSelector = createSelector(
  historyStateSelector,
  state => state.isLoading,
);

const currentHistorySelector = createSelector(
  historyStateSelector,
  state => state.currentHistory,
);

export const HistorySelectors = {
  isLastSelector,
  isLoadingSelector,
  pageNumberSelector,
  historyListSelector,
  currentHistorySelector,
};
