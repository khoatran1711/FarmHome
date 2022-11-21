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

export const ProductHistoryDetail = () => {
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
        </View>
      </ScrollView>
    </View>
  );
};

const ProductCard = () => {
  return (
    <View style={styles.productCard}>
      <Text style={styles.infoTime}>Bought at 10:20</Text>
      <View style={styles.productCardImage}>
        <Image source={banner1} style={styles.image} />
      </View>
      <Text style={styles.productName}>Dâu Tây Đà Lạt</Text>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <Text style={styles.info}>Amount:10</Text>
          <Text style={styles.info}>Amount:10</Text>
          <Text style={styles.info}>Amount:10</Text>
        </View>
        <View
          style={{width: '50%', alignItems: 'flex-end', marginVertical: 10}}>
          <Text style={styles.info}>Khoa Tran</Text>
          <Text style={styles.info}>0908851760</Text>
          <Text style={styles.info}>khoatran!23@gamil.com</Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text style={styles.infoTitle}>
        Thank you for your booking!Please keep on contact with us to know when
        our product is ready.
      </Text>
    </View>
  );
};
