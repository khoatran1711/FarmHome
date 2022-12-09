import React from 'react';
import {TextInput} from 'react-native';
import {styles} from './input-number.style';

interface inputData {
  onTextChange?: any;
  placeHolder?: string;
  value?: string;
}

export const InputNumber = (props: inputData) => {
  return (
    <TextInput
      placeholder={props?.placeHolder}
      onChangeText={props?.onTextChange}
      keyboardType="numeric"
      style={styles.inputText}
      value={props?.value || '0'}
    />
  );
};
