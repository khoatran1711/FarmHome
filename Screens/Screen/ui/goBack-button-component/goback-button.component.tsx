import React from 'react';
import {Image, TouchableOpacity, ViewStyle} from 'react-native';
import {backIcon} from '../../../constants/assets.constants';
import {globalGoBack} from '../../../utilities/navigator-utilities';
import {styles} from './goback-button.styles';

interface GoBackButtonProps {
  buttonStyle?: ViewStyle;
}

export const GoBackButton = (props?: GoBackButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.imageHeaderContainer, props?.buttonStyle]}
      onPress={() => globalGoBack()}>
      <Image source={backIcon} style={styles.imageHeader} />
    </TouchableOpacity>
  );
};
