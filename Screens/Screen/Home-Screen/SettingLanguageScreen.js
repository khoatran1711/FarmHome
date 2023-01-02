import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {I18n} from '../../translation';
import Selector from './LanguageSelector';

export const SettingsLanguageScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Selector />
    </View>
  );
};
