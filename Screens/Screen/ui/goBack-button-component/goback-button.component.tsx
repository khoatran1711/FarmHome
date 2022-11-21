import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {backIcon} from '../../../constants/assets.constants';
import {globalGoBack} from '../../../utilities/navigator-utilities';
import {styles} from './goback-button.styles';

export const GoBackButton = () => {
  return (
    <TouchableOpacity
      style={styles.imageHeaderContainer}
      onPress={() => globalGoBack()}>
      <Image source={backIcon} style={styles.imageHeader} />
    </TouchableOpacity>
  );
};
