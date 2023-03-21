import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {getAllOrders} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getImageFarmer} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Order, STATUS_CODE_ORDER} from '../Models/order.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {HeaderTitle} from '../ui/header-title';
import {WaitingCard} from '../ui/waiting-card';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './waiting-screen.style';

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
    <>
      <View style={styles.container}>
        <ScrollView>
          <GoBackButton />
          <HeaderTitle title={I18n.paymentWaitingList.toUpperCase()} />
          {orders?.map(item => (
            <>
              <Text style={styles.dateTitle}>{item?.date}</Text>
              <WaitingCard
                farmerName={
                  item?.farmer?.firstName + ' ' + item?.farmer?.lastName
                }
                farmerImage={getImageFarmer(item?.farmer?.avatar)}
                productName={item?.fruit?.name}
                productImage={getImage(item?.fruit?.images[0]?.url)}
                productAmount={item?.amount}
                productPrice={item?.price}
                isTransport={item?.transport}
                unit={item?.fruit?.unit}
                onPress={() =>
                  globalNavigate(ScreenName.ProductWaitingScreen, {
                    orderId: item?.id,
                  })
                }
                isNoticed={item?.status?.name === STATUS_CODE_ORDER.DEALING}
              />
            </>
          ))}
        </ScrollView>
      </View>
      {loading && <WaitingComponent />}
    </>
  );
};
