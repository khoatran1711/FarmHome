import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {
  AuthenticationState,
  AUTHENTICATION_STATE_NAME,
} from './authentication.constant';

const authenticateStateSelector = (state: RootState): AuthenticationState =>
  state[AUTHENTICATION_STATE_NAME];

const tokenSelector = createSelector(authenticateStateSelector, state => {
  return state?.token;
});

const deviceTokenSelector = createSelector(authenticateStateSelector, state => {
  return state?.deviceToken;
});

const isLoadingSelector = createSelector(
  authenticateStateSelector,
  state => state.isLoading,
);

const idSelector = createSelector(authenticateStateSelector, state => state.id);

export const AuthenticationSelectors = {
  tokenSelector,
  isLoadingSelector,
  idSelector,
  deviceTokenSelector,
};
