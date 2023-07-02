import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../Screen/Models/product.model';

import {PopupState, POPUP_DIALOG_STATE_NAME} from './popup-dialog.constant';

const initialState: PopupState = {
  popupProps: {
    content: '',
    header: '',
    isShow: false,
  },
};

export const PopupSlice = createSlice({
  name: POPUP_DIALOG_STATE_NAME,
  initialState,
  reducers: {
    setPopup: (
      state,
      action: PayloadAction<{
        isShow: boolean;
        header: string;
        content: string;
        isConfirm?: boolean;
        onClick?: boolean;
      }>,
    ) => {
      state.popupProps = action.payload;
    },
  },
});

export const PopupReducer = PopupSlice.reducer;
export const PopupActions = PopupSlice.actions;
