/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import {LoginScreen} from './Screens/Screen/Login-Screen/login-screen';

const App: () => Node = () => {
  return (
    <Provider store={RootStore}>
      <PersistGate persistor={RootPersistor}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
