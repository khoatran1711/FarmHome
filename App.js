/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import 'intl-pluralrules';
import {SignupScreen} from './Screens/Screen/Signup-Screen/signup-screen';

import {StackNavigator} from './Screens/navigation/RootNavigator';
import './Screens/constants/IMLocalize';

import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {RootPersistor, RootStore} from './Screens/domain/store';
import {Provider, useDispatch} from 'react-redux';
import {WithSplashScreen} from './Screens/Screen/SplashScreen/splash-screen.component';
import {ProductCard} from './Screens/Screen/ui/product-card/product-card.component';
import {ProductCardHorizontal} from './Screens/Screen/ui/product-card-horizontal/product-card-horizontal.component';
import {SignUpScreenComponent} from './Screens/Screen/SignupScreen/signup-screen.component';
import PushController from './Screens/services/notification.service';
import PushNotification from 'react-native-push-notification';
import {GiftedChat} from 'react-native-gifted-chat';
import {addDoc, collection, getFirestore} from '@firebase/firestore';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import {useMemo} from 'react';
import axios from 'axios';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {checkToken} from './Screens/state/authentication/authentication.thunk';
import {globalNavigate} from './Screens/utilities/navigator-utilities';
import {ScreenName} from './Screens/constants/screen-name.constant';
import {
  banner,
  notificationBackground,
} from './Screens/constants/assets.constants';
import {FontSize} from './Screens/constants/fontsize.constants';
import {Colors} from './Screens/constants/color.constants';
import {toastConfig} from './Screens/Screen/NotificationScreen/notification-screen.component';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {I18n} from './Screens/translation';
import {useRootSelector} from './Screens/domain/hooks';
import {PopupSelectors} from './Screens/state/popup-dialog/popup-dialog.selector';
import {PopupActions} from './Screens/state/popup-dialog/popup-dialog.state';

async function initialize() {}

const App: () => Node = () => {
  const store = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    initialize().then(context => {
      store.current = RootStore;

      setIsAppReady(true);
    });
  }, []);

  return (
    <>
      <WithSplashScreen isAppReady={isAppReady}>
        <Provider store={store.current}>
          <Main />
        </Provider>
      </WithSplashScreen>
      <PushController />
      <Toast config={toastConfig} />

      {/* <GiftedChat
        textInputProps={{color: 'black'}}
        messages={data}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
          name: 'Khoa Trần',
        }}
      /> */}
    </>
  );
};

const Main = () => {
  const popupProps = useRootSelector(PopupSelectors.popupSelector);
  const dispatch = useDispatch();

  return (
    <PersistGate persistor={RootPersistor}>
      <StackNavigator />
      <Dialog
        dialogStyle={{backgroundColor: Colors.Finlandia}}
        dialogAnimation={
          new SlideAnimation({
            toValue: 0, // optional
            slideFrom: 'bottom', // optional
            useNativeDriver: true, // optional
          })
        }
        visible={popupProps.isShow}
        dialogTitle={
          <DialogTitle
            textStyle={{color: Colors.Solitaire}}
            style={{
              backgroundColor: Colors.TimberGreen,
            }}
            title={popupProps.header}
          />
        }
        footer={
          popupProps?.isConfirm && (
            <DialogFooter>
              <DialogButton
                textStyle={styles.dialogButtonStyle}
                text={I18n.confirm}
                onPress={() => {
                  popupProps?.onClick();
                }}
              />
              <DialogButton
                textStyle={styles.dialogButtonStyle}
                text={I18n.cancel}
                onPress={() => {
                  dispatch(
                    PopupActions.setPopup({...popupProps, isShow: false}),
                  );
                }}
              />
            </DialogFooter>
          )
        }
        onTouchOutside={() =>
          dispatch(PopupActions.setPopup({...popupProps, isShow: false}))
        }>
        <DialogContent>
          <Text style={styles.dialogStyle}>{popupProps.content}</Text>
        </DialogContent>
      </Dialog>
    </PersistGate>
  );
};

export default App;

const styles = StyleSheet.create({
  dialogStyle: {
    color: Colors.Solitaire,
    paddingVertical: '3%',
    minWidth: '80%',
    textAlign: 'center',
  },
  dialogButtonStyle: {
    color: Colors.Solitaire,
    fontSize: FontSize.MediumSmall,
  },
});
