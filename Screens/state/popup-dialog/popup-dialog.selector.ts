import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../domain/store';
import {PopupState, POPUP_DIALOG_STATE_NAME} from './popup-dialog.constant';

const popupStateSelector = (state: RootState): PopupState =>
  state[POPUP_DIALOG_STATE_NAME];

const popupSelector = createSelector(popupStateSelector, state => {
  return state?.popupProps;
});

export const PopupSelectors = {
  popupSelector,
};
