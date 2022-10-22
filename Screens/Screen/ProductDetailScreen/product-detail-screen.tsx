import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {banner1} from '../../constants/assets.constants';
import {styles} from './product-detail.style';

export const ProductDetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Image style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageProductContainer}>
        <View style={styles.imageProductBackground} />
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={banner1}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.productInformation}>
          <Text style={styles.productName}>CUCUMBER</Text>
          <Text style={styles.productDescription}>
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          </Text>
          <View style={styles.farmerInformation}>
            <Text style={styles.farmerTitle}>FARMER</Text>
            <Text style={styles.farmerInfo}>
              666 Lạc Long Quân Phường 9 quận Tân Bình
            </Text>

            <Text style={styles.farmerInfo}>Hotline - 0908851760</Text>

            <Text style={styles.farmerInfo}>
              666 Lạc Long Quân Phường 9 quận Tân Bình
            </Text>
          </View>
        </View>

        <View style={styles.rightButton}>
          <View style={styles.inStockUp}>
            <TouchableOpacity>
              <Text>In StockUp</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewShopContainer}>
            <TouchableOpacity>
              <Text>In StockUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
