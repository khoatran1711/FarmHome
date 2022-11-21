import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {banner1, exploreBanner2} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './history-style';

export const HistoryScreen = () => {
  const [currentTime, setCurrentTime] = useState<string | undefined>(
    new Date().toLocaleTimeString(),
  );
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  const getTime = () => {
    if (!currentDate) return '';

    const date = currentDate?.getDate();
    const month = currentDate?.getMonth() + 1;
    const year = currentDate?.getFullYear();

    return date + '/' + month + '/' + year;
  };

  const getWish = () => {
    if (!currentDate) return 'Hello';
    if (currentDate?.getHours() > 5 && currentDate?.getHours() < 12)
      return 'Good Morning';
    if (currentDate?.getHours() >= 12 && currentDate?.getHours() < 18)
      return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <GoBackButton />
      <ScrollView>
        <View style={styles.wishContainer}>
          <Text style={styles.wishTitle}>{getWish()}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dateTitle}>{getTime()}</Text>

            <Text style={styles.timeTitle}>{currentTime}</Text>
          </View>
        </View>

        <View style={styles.productContainer}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.DarkGreen,
              fontSize: FontSize.MediumSmall,
              fontWeight: '800',
              marginBottom: 10,
            }}>
            19/2/2022
          </Text>
          <ProductCard />
        </View>
      </ScrollView>
    </View>
  );
};

const ProductCard = () => {
  return (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() => globalNavigate('ProductHistoryScreen')}>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>Dâu Tây Đà Lạt</Text>

        <View style={styles.productInfo}>
          <Text style={styles.info}>Amount:10</Text>
          <Text style={styles.info}>Amount:10</Text>
          <Text style={styles.info}>Amount:10</Text>
        </View>
      </View>

      <View style={styles.productImage}>
        <View style={styles.imageWrapper}>
          <Image source={banner1} style={styles.image} />
        </View>

        <TouchableOpacity style={styles.imageWrapper}>
          <Image source={exploreBanner2} style={styles.image} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
