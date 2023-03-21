import React from 'react';
import {ViewStyle} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {styles} from './radio-button.style';

interface RadioButtonData {
  isChoose: boolean;
  title?: string;
  onPress?: any;
  buttonStyle?: ViewStyle;
}

export const RadioButton = (props: RadioButtonData) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={[styles.buttonContainer, props?.buttonStyle]}>
        <View
          style={[
            {
              backgroundColor: props.isChoose
                ? Colors.Solitaire
                : 'transparent',
            },
            styles.chooseButton,
          ]}
        />
      </View>
      <Text style={styles.title}>{props?.title}</Text>
    </TouchableOpacity>
  );
};
