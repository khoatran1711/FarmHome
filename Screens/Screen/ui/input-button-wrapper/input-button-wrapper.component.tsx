import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {eyeIcon} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {styles} from './input-button-wrapper.style';

interface InputButtonWrapperProps {
  wrapperStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
  content?: string;
  textInputStyle?: TextStyle;
  onPress?: (e?: any) => void;
  icon?: any;
}

export const InputButtonWrapper = (props?: InputButtonWrapperProps) => {
  return (
    <View style={[styles.container, props?.wrapperStyle]}>
      {props?.label && (
        <Text style={[styles.label, props?.labelStyle]}>{props?.label}</Text>
      )}
      <TouchableOpacity onPress={props?.onPress}>
        <View style={styles.inputContainer}>
          <Text style={[styles.input, props?.textInputStyle]}>
            {props?.content}
          </Text>
          {props?.icon && (
            <Image
              source={props?.icon}
              resizeMode={'stretch'}
              style={{width: 30, height: 30, alignItems: 'flex-end'}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
