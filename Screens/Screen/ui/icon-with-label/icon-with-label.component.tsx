import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Image, Text, View} from 'react-native';
import {validAmountIcon} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

interface IconWithLabel {
  icon?: ImageSourcePropType;
  label?: string;
  smallLabel?: string;
}

export const IconWithLabel = (props?: IconWithLabel) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Image
        source={props?.icon}
        style={{width: 20, height: 20, resizeMode: 'stretch', marginRight: 10}}
      />
      <Text
        style={{
          color: Colors.TimberGreen,
          fontSize: FontSize.Normal,
          fontWeight: '600',
          textAlignVertical: 'center',
        }}>
        {props?.label}
      </Text>

      <Text
        style={{
          color: Colors.TimberGreen,
          fontSize: FontSize.SemiSmall,
          fontWeight: '600',
          textAlignVertical: 'bottom',
        }}>
        {props?.smallLabel}
      </Text>
    </View>
  );
};
