import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  backgroundLine,
  banner,
  banner1,
  new1,
} from '../../constants/assets.constants';
import {styles} from './product-detail.style';
import Carousel from 'react-native-snap-carousel';
import {Colors} from '../../constants/color.constants';
import {ImageBackground} from 'react-native';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {globalNavigate} from '../../utilities/navigator-utilities';

const sliderItem = [
  {
    index: 0,
    image: banner1,
  },
  {
    index: 1,
    image: banner,
  },
  {
    index: 2,
    image: banner1,
  },
  {
    index: 3,
    image: new1,
  },
  {
    index: 4,
    image: banner1,
  },
  {
    index: 5,
    image: banner,
  },
];

const loadImage = ({item}) => {
  return (
    <View style={styles.imageWrapper}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export const ProductDetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Image style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageProductContainer}>
        <View style={styles.imageProductBackground}>
          <GoBackButton />
        </View>
        <View style={styles.imageContainer}>
          <Carousel
            sliderWidth={300}
            sliderHeight={100}
            itemWidth={300}
            data={sliderItem}
            renderItem={loadImage}
            autoplay={true}
            autoplayInterval={5000}
            hasParallaxImages={true}
          />
        </View>
      </View>
      <ImageBackground source={backgroundLine} style={styles.contentContainer}>
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

            <Text style={styles.farmerInfo}>farmhome@gmail.com</Text>
          </View>
        </View>

        <View style={styles.rightButton}>
          <TouchableOpacity style={styles.inStockUp}>
            <Text style={styles.inStockUpTitle}>In StockUp</Text>
            <Text style={styles.inStockUpNumber}>300 Kg</Text>
          </TouchableOpacity>

          <View style={styles.viewShopContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => globalNavigate('StoreDetailScreen')}>
              <Text style={styles.viewShopTitle}>View Farm </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.phoneNowTitle}>Phone Now </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
