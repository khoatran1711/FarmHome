import {AUTHENTICATION_STATE_NAME} from '../state/authentication/authentication.constant';
import {AuthenticationReducer} from '../state/authentication/authentication.state';
import {EXPLORE_STATE_NAME} from '../state/explore/explore.constant';
import {ExploreReducer} from '../state/explore/explore.state';
import {HISTORY_STATE_NAME} from '../state/history/history.constant';
import {HistoryReducer} from '../state/history/history.state';
import {POPUP_DIALOG_STATE_NAME} from '../state/popup-dialog/popup-dialog.constant';
import {PopupReducer} from '../state/popup-dialog/popup-dialog.state';
import {PRODUCT_LIST_STATE_NAME} from '../state/product-list/product-list.constant';
import {ProductListReducer} from '../state/product-list/product-list.state';
import {WAITING_LIST_STATE_NAME} from '../state/waiting-list/waiting-list.constant';
import {WaitingListReducer} from '../state/waiting-list/waiting-list.state';

export const RootReducer = {
  [AUTHENTICATION_STATE_NAME]: AuthenticationReducer,
  [EXPLORE_STATE_NAME]: ExploreReducer,
  [PRODUCT_LIST_STATE_NAME]: ProductListReducer,
  [WAITING_LIST_STATE_NAME]: WaitingListReducer,
  [POPUP_DIALOG_STATE_NAME]: PopupReducer,
  [HISTORY_STATE_NAME]: HistoryReducer,
};
