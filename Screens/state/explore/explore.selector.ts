import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {ExploreState, EXPLORE_STATE_NAME} from './explore.constant';

const exploreStateSelector = (state: RootState): ExploreState =>
  state[EXPLORE_STATE_NAME];

const productListSelector = createSelector(exploreStateSelector, state => {
  return state?.productList;
});

const pageNumberSelector = createSelector(exploreStateSelector, state => {
  return state?.pageNumber;
});

const isLastSelector = createSelector(
  exploreStateSelector,
  state => state.isLast,
);

const isLoadingSelector = createSelector(
  exploreStateSelector,
  state => state.isLoading,
);

export const ExploreSelectors = {
  isLastSelector,
  isLoadingSelector,
  pageNumberSelector,
  productListSelector,
};
