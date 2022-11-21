import {CommonActions, NavigationState} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigator';

export interface ScreenProps {
  name: string;
  params?: any;
}

export const reset = (state: NavigationState) => {
  navigationRef.dispatch(CommonActions.reset(state));
};

export const resetNavigation = (screen: string, params?: any) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params,
        },
      ],
    }),
  );
};

export const resetNavigationToScreen = (listScreens: ScreenProps[]) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: listScreens,
    }),
  );
};

export function globalGoBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function globalNavigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}
