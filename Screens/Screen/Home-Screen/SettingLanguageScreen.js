import React from 'react';
import {Text, View} from 'react-native';
import Selector from './LanguageSelector';

export const SettingsLanguageScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Selector />
    </View>
  );
};
