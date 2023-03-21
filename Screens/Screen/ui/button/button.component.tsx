import React from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';
import {styles} from './button.style';

interface ButtonProps {
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onPress?: () => void;
  title?: string;
}

export const Button = (props?: ButtonProps) => {
  return (
    <View style={[styles.container, props?.buttonStyle]}>
      <TouchableOpacity style={{width: '100%'}} onPress={props?.onPress}>
        <Text style={[styles.title, props?.titleStyle]}>{props?.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
