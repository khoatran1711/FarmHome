import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  agreeIcon,
  backIcon,
  banner1,
  deleteIcon,
  disAgreeIcon,
  exploreBanner2,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {globalGoBack} from '../../../utilities/navigator-utilities';
import {styles} from './product-style';

export const ProductWaitingDetail = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.imageHeaderContainer}
            onPress={() => globalGoBack()}>
            <Image source={backIcon} style={styles.imageHeader} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageHeaderContainer}>
            <Image source={deleteIcon} style={styles.imageHeader} />
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.productName}>Dâu Tây Đà Lạt</Text>

          <View style={styles.productImage}>
            <View style={styles.imageWrapper}>
              <Image source={banner1} style={styles.image} />
            </View>

            <TouchableOpacity style={styles.imageWrapper}>
              <Image source={exploreBanner2} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productCardArea}>
          <ProductCard />
          <ProductDealing />
        </View>
      </ScrollView>
    </View>
  );
};

const ProductCard = () => {
  return (
    <View style={styles.productCard}>
      <View style={styles.productCardImage}>
        <Image source={banner1} style={styles.image} />
      </View>
      <Text style={styles.productName}>Dâu Tây Đà Lạt</Text>
      <Text style={styles.info}>Amount:10</Text>
      <Text style={styles.info}>Amount:10</Text>
      <Text style={styles.info}>Amount:10</Text>
    </View>
  );
};

const ProductDealing = () => {
  return (
    <>
      <Text style={styles.timeTitle}>17:50</Text>
      <TouchableOpacity style={styles.dealingShopImage}>
        <Image source={exploreBanner2} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.productCard}>
        <View style={styles.productCardImage}>
          <Image source={banner1} style={styles.image} />
        </View>
        <Text style={styles.productName}>Dâu Tây Đà Lạt</Text>
        <Text style={styles.info}>Amount:10</Text>
        <Text style={styles.info}>Amount:10</Text>
        <View style={styles.line} />
        <Text style={styles.info}>
          We would like to have our product price change a little bit, can we
          make a deal ?
        </Text>

        <View style={styles.options}>
          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionImage}>
              <Image source={agreeIcon} style={styles.image} />
            </View>
            <Text style={styles.infoOption}>
              Fine, I would agree with this price.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionImage}>
              <Image source={disAgreeIcon} style={styles.image} />
            </View>
            <Text style={styles.infoOption}>
              No thanks, I will look for another product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
