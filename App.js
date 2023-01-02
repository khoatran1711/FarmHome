/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import 'intl-pluralrules';
import {SignupScreen} from './Screens/Screen/Signup-Screen/signup-screen';

import {StackNavigator} from './Screens/navigation/RootNavigator';
import './Screens/constants/IMLocalize';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {RootPersistor, RootStore} from './Screens/domain/store';
import {Provider} from 'react-redux';
import {WithSplashScreen} from './Screens/Screen/SplashScreen/splash-screen.component';
import {ProductCard} from './Screens/Screen/ui/product-card/product-card.component';
import {ProductCardHorizontal} from './Screens/Screen/ui/product-card-horizontal/product-card-horizontal.component';
import {SignUpScreenComponent} from './Screens/Screen/SignupScreen/signup-screen.component';

async function initialize() {}

const App: () => Node = () => {
  const store = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    initialize().then(context => {
      store.current = RootStore;
      console.log('hello');
      setIsAppReady(true);
    });
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Provider store={store.current}>
        <PersistGate persistor={RootPersistor}>
          <StackNavigator />
          {/* <SignUpScreenComponent /> */}
        </PersistGate>
      </Provider>
    </WithSplashScreen>
  );
};

export default App;
