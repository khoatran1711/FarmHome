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
import {styles} from './product-card-mini.styles';

interface ProductCardProps {
  image: ImageSourcePropType;
  name: string;
  weight: number;
  unit: string;
  storeName: string;
  address: string;
  onPress: () => void;
}

export const ProductCardMini = (props: ProductCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={props?.onPress}>
      <Image source={props?.image} style={styles.imageFruit} />
      <ImageBackground
        source={productCardBackground}
        resizeMode="stretch"
        style={styles.background}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {props?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                backgroundColor: Colors.Finlandia,
                borderRadius: 7,
                marginTop: 3,
                color: Colors.Solitaire,
                paddingVertical: 2,
              },
            ]}>
            {props?.weight} {props?.unit}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
