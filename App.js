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

const App: () => Node = () => {
  return <StackNavigator />;
};

export default App;
