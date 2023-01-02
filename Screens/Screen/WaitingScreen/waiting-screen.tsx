import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {banner1, exploreBanner2} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {useRootSelector} from '../../domain/hooks';
import {getAllOrders} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {
  getFarmerLocation,
  getImageFarmer,
} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Order} from '../Models/order.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './waiting-style';

export const WaitingScreen = (props?: any) => {
  const userId = useRootSelector(AuthenticationSelectors.idSelector);
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState<string | undefined>(
    new Date().toLocaleTimeString(),
  );
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000 * 60);

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
      return I18n.goodMorning;
    if (currentDate?.getHours() >= 12 && currentDate?.getHours() < 18)
      return I18n.goodAfternoon;
    return I18n.goodEvening;
  };

  const getData = async Id => {
    setLoading(true);
    const response = await getAllOrders(Id);
    const data = response?.data;
    setOrders(data?.contents);
    setLoading(false);
  };
  let isLoading = props?.route?.params;
  useEffect(() => {
    getData(userId);
    isLoading = false;
  }, [userId, isLoading]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <GoBackButton />
          <View style={styles.wishContainer}>
            <Text style={styles.wishTitle}>{getWish()}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dateTitle}>{getTime()}</Text>

              <Text style={styles.timeTitle}>
                {currentTime?.substring(0, 5)}
              </Text>
            </View>
          </View>

          {orders?.map(item => (
            <View style={styles.productContainer}>
              <TouchableOpacity
                style={styles.productCardContainer}
                onPress={() =>
                  globalNavigate('ProductWaitingScreen', {orderId: item?.id})
                }>
                <View style={styles.productInfoContainer}>
                  <Text style={styles.productName}>{item?.fruit?.name}</Text>

                  <View style={styles.productInfo}>
                    <Text style={styles.info}>
                      {I18n.amount}: {item?.amount} {item?.fruit?.unit}
                    </Text>
                    <Text style={styles.info}>
                      {I18n.shop}: {item?.farmer?.firstName}{' '}
                      {item?.farmer?.lastName}
                    </Text>
                    <Text style={[styles.info, {flexBasis: '80%'}]}>
                      {I18n.price}: {item?.price}.000đ/{item?.fruit?.unit}
                    </Text>
                    <Text style={[styles.info, {flexBasis: '80%'}]}>
                      {item?.transport
                        ? I18n.transportSupport
                        : I18n.notTransportSupport}
                    </Text>
                    <Text style={[styles.info, {flexBasis: '90%'}]}>
                      {getFarmerLocation(item?.farmer?.location)}
                    </Text>
                  </View>
                </View>

                <View style={styles.productImage}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={getImage(item?.fruit?.images[0]?.url)}
                      style={styles.image}
                    />
                  </View>

                  <TouchableOpacity style={styles.imageWrapper}>
                    <Image
                      source={getImageFarmer(item?.farmer?.avatar)}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <WaitingComponent />
      )}
    </View>
  );
};
