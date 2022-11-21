import {AUTHENTICATION_STATE_NAME} from '../state/authentication/authentication.constant';
import {AuthenticationReducer} from '../state/authentication/authentication.state';

export const RootReducer = {
  [AUTHENTICATION_STATE_NAME]: AuthenticationReducer,
};
