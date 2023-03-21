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
  productCardHorizontalBackground,
} from '../../../constants/assets.constants';
import {styles} from './product-card-horizontal.style';

interface ProductCardHorizontalProps {
  fruitImage: ImageSourcePropType;
  name: string;
  weight: number;
  unit: string;
  address: string;
  storeImage?: ImageSourcePropType;
  storeName: string;
  onPress: () => void;
  description?: string;
}

export const ProductCardHorizontal = (props: ProductCardHorizontalProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={props?.onPress}>
      <Image source={props?.fruitImage} style={styles.imageFruit} />
      <ImageBackground
        source={productCardHorizontalBackground}
        resizeMode="stretch"
        style={styles.background}>
        <Text style={styles.priceTitle}>
          {props?.weight} {props?.unit}
        </Text>
        <View style={styles.content}>
          <Text style={styles.titleName}>{props?.name}</Text>
          <Text style={styles.titleDescription} numberOfLines={2}>
            {props?.description}
          </Text>

          <Text style={styles.title}>{props?.storeName}</Text>
          <Text style={styles.titleDescription} numberOfLines={2}>
            {props?.address}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
