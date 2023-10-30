import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {
  DeliveryListState,
  DELIVERY_LIST_STATE_NAME,
} from './delivering-list.constant';

const deliveryListStateSelector = (state: RootState): DeliveryListState =>
  state[DELIVERY_LIST_STATE_NAME];

const deliveryListSelector = createSelector(
  deliveryListStateSelector,
  state => {
    return state?.contents;
  },
);

const pageNumberSelector = createSelector(deliveryListStateSelector, state => {
  return state?.pageNumber;
});

const isLastSelector = createSelector(
  deliveryListStateSelector,
  state => state.last,
);

const isLoadingSelector = createSelector(
  deliveryListStateSelector,
  state => state.isLoading,
);

const currentOrderSelector = createSelector(
  deliveryListStateSelector,
  state => state.currentOrder,
);

export const DeliveryListSelectors = {
  isLastSelector,
  isLoadingSelector,
  pageNumberSelector,
  deliveryListSelector,
  currentOrderSelector,
};
