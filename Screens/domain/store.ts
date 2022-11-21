import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import {AUTHENTICATION_STATE_NAME} from '../state/authentication/authentication.constant';
import {AuthenticationReducer} from '../state/authentication/authentication.state';
import {RootReducer} from './reducer';

const storage: Storage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    return Promise.resolve(true);
  },
  getItem: (key: string): Promise<string> => {
    const value = '';
    return Promise.resolve(value as string);
  },
  removeItem: (key: string): Promise<void> => {
    return Promise.resolve();
  },
};

const reducer = combineReducers(RootReducer);

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage,
    whitelist: [AUTHENTICATION_STATE_NAME],
    throttle: 300,
  },
  reducer,
);

export const RootStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const RootPersistor = persistStore(RootStore);

export type RootStoreType = typeof RootStore;
export type RootState = ReturnType<typeof RootStore.getState>;
export type RootDispatch = typeof RootStore.dispatch;
