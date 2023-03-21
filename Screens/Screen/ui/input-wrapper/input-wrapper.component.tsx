import React from 'react';
import {Image, TextStyle, TouchableOpacity} from 'react-native';
import {Text, TextInput, View, ViewStyle} from 'react-native';
import {ImageSource} from 'react-native-vector-icons/icon';
import {Colors} from '../../../constants/color.constants';
import {I18n} from '../../../translation';
import {styles} from './input-wrapper.style';

interface InputWrapperProps {
  wrapperStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
  textInputStyle?: TextStyle;
  placeHolder?: string;
  placeHolderColor?: string;
  isHidden?: boolean;
  numberOnly?: boolean;
  onTextChange?: (e?: any) => void;
  value?: string;
  disable?: boolean;
  multipleLine?: boolean;
  icon?: ImageSource;
  onIconPress?: (e?: any) => void;
}

export const InputWrapper = (props?: InputWrapperProps) => {
  return (
    <View style={[styles.container, props?.wrapperStyle]}>
      {props?.label && (
        <Text style={[styles.label, props?.labelStyle]}>{props?.label}</Text>
      )}
      {props?.disable ? (
        <Text style={[styles.readOnly, , props?.textInputStyle]}>
          {props?.value}
        </Text>
      ) : (
        <>
          {props?.icon ? (
            <View
              style={[
                styles.input,
                {flexDirection: 'row', paddingHorizontal: 0},
              ]}>
              <TextInput
                keyboardType={props?.numberOnly ? 'numeric' : 'default'}
                placeholder={props?.placeHolder ? props?.placeHolder : ''}
                placeholderTextColor={
                  props?.placeHolderColor
                    ? props?.placeHolderColor
                    : Colors.White80
                }
                contextMenuHidden={true}
                secureTextEntry={props?.isHidden}
                onChangeText={props?.onTextChange}
                value={props?.value}
                multiline={props?.multipleLine}
                style={[styles.input, {marginTop: 0, width: '86%'}]}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={props?.onIconPress}>
                <Image source={props?.icon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              keyboardType={props?.numberOnly ? 'numeric' : 'default'}
              placeholder={props?.placeHolder ? props?.placeHolder : ''}
              placeholderTextColor={
                props?.placeHolderColor
                  ? props?.placeHolderColor
                  : Colors.White80
              }
              style={[styles.input, props?.textInputStyle]}
              contextMenuHidden={true}
              secureTextEntry={props?.isHidden}
              onChangeText={props?.onTextChange}
              value={props?.value}
              multiline={props?.multipleLine}
            />
          )}
        </>
      )}
    </View>
  );
};
