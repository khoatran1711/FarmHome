import React from 'react';
import {ImageSourcePropType, Text, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './long-horizontal-button-icon.style';

interface LongHorizontalButtonIconProps {
  icon?: ImageSourcePropType;
  title?: string;
  onPress?: () => void;
}

export const LongHorizontalButtonIcon = (
  props?: LongHorizontalButtonIconProps,
) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props?.onPress}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Image source={props?.icon} style={styles.image} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{props?.title}</Text>

          <Text style={styles.title}>➤</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
