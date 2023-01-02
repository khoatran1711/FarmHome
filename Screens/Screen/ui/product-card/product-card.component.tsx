import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  banner1,
  productCardBackground,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {styles} from './product-card.style';

interface ProductCardProps {
  image: ImageSourcePropType;
  name: string;
  weight: string;
  unit: string;
  storeName: string;
  address: string;
  onPress: () => void;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={props?.onPress}>
      <TouchableOpacity>
        <Image source={props?.image} style={styles.imageFruit} />
      </TouchableOpacity>

      <ImageBackground
        source={productCardBackground}
        resizeMode="stretch"
        style={styles.background}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props?.name}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {props?.weight} {props?.unit}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {props?.storeName}
          </Text>
          <Text numberOfLines={2} style={styles.title}>
            {props?.address}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
