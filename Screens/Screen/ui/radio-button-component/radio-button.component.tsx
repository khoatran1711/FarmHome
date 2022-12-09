import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {styles} from './radio-button.style';

interface RadioButtonData {
  isChoose: boolean;
  title?: string;
  onPress?: any;
}

export const RadioButton = (props: RadioButtonData) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <View
          style={[
            {
              backgroundColor: props.isChoose ? Colors.DarkGreen : Colors.White,
              borderWidth: props.isChoose ? 1 : 0,
            },
            styles.chooseButton,
          ]}
        />
      </View>
      <Text style={styles.title}>{props?.title}</Text>
    </TouchableOpacity>
  );
};
