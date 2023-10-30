import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  banner,
  productVerticalCardFruit,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';
import {getImage} from '../../../utilities/format-utilities';
import {
  getFarmerShortLocation,
  getImageVerticalCard,
} from '../../../utilities/help-utilities';
import {Product} from '../../Models/product.model';
import {styles} from './product-card-vertical.style';

interface ProductCardVerticalProp {
  product?: Product;
  onPress?: () => void;
}

export const ProductCardVertical = (props?: ProductCardVerticalProp) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props?.onPress}>
        <Image
          source={getImage(props?.product?.images[0]?.url)}
          style={styles.imageProduct}
        />

        <ImageBackground
          source={getImageVerticalCard(props?.product?.category)}
          style={styles.imageBackground}
          resizeMode={'stretch'}>
          <View style={styles.content}>
            <View style={styles.firstContent}>
              <Text numberOfLines={1} style={styles.productName}>
                {props?.product?.name}
              </Text>

              <Text numberOfLines={2} style={styles.productDescription}>
                {props?.product?.description}
              </Text>

              <View style={styles.priceContainer}>
                <Text numberOfLines={1} style={styles.productPrice}>
                  {props?.product?.remainingWeight + ' ' + props?.product?.unit}
                </Text>
              </View>
            </View>

            <View>
              <Text numberOfLines={1} style={styles.farmerName}>
                {props?.product?.farmer?.firstName +
                  ' ' +
                  props?.product?.farmer?.lastName}{' '}
                ⪼
              </Text>
              <Text numberOfLines={1} style={styles.farmerLocation}>
                {getFarmerShortLocation(props?.product?.farmer?.location)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};
