import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {banner1, exploreBanner2} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {getOrdersHistory} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {
  convertDateJsonToDate,
  getImageFarmer,
} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {OrderHistory} from '../Models/order.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {HeaderTitle} from '../ui/header-title';
import {WaitingCard} from '../ui/waiting-card';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './history-screen.style';

export const HistoryScreen = () => {
  const userId = useRootSelector(AuthenticationSelectors.idSelector);

  const [loading, setLoading] = useState(false);
  const [historyOrders, setHistoryOrders] = useState<OrderHistory[]>();
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

  const getData = async Id => {
    setLoading(true);
    const response = await getOrdersHistory(Id);
    const data = response?.data;
    setHistoryOrders(data?.contents);
    setLoading(false);
  };

  useEffect(() => {
    getData(userId);
  }, [userId]);

  return (
    // <View style={styles.container}>
    //   {!loading ? (
    //     <ScrollView>
    //       <GoBackButton />
    //       <View style={styles.wishContainer}>
    //         <Text style={styles.wishTitle}>{getWish()}</Text>
    //         <View style={{flexDirection: 'row'}}>
    //           <Text style={styles.dateTitle}>{getTime()}</Text>

    //           <Text style={styles.timeTitle}>{currentTime}</Text>
    //         </View>
    //       </View>
    //       {historyOrders?.map(item => (
    //         <View style={styles.productContainer}>
    //           <Text
    //             style={{
    //               textAlign: 'center',
    //               color: Colors.DarkGreen,
    //               fontSize: FontSize.MediumSmall,
    //               fontWeight: '800',
    //               marginBottom: 10,
    //             }}>
    //             {item?.date}
    //           </Text>
    //           <ProductCard order={item} />
    //         </View>
    //       ))}
    //     </ScrollView>
    //   ) : (
    //     <WaitingComponent />
    //   )}
    // </View>
    <>
      <View style={styles.container}>
        <ScrollView>
          <GoBackButton />
          <HeaderTitle title={I18n.history.toUpperCase()} />
          {historyOrders?.map(item => (
            <>
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
                  globalNavigate(ScreenName.ProductHistoryScreen, item?.id)
                }
                date={convertDateJsonToDate(item?.date)}
              />
            </>
          ))}
        </ScrollView>
      </View>
      {loading && <WaitingComponent />}
    </>
  );
};

const ProductCard = ({order}: {order: OrderHistory}) => {
  return (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() => globalNavigate('ProductHistoryScreen', order?.id)}>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>{order?.fruit?.name}</Text>

        <View style={styles.productInfo}>
          <Text style={styles.info}>
            Số lượng: {order?.amount} {order?.fruit?.unit}
          </Text>
          <Text style={[styles.info, {flexBasis: '80%'}]}>
            Giá thành: {order?.price}.000đ/{order?.fruit?.unit}
          </Text>
          <Text style={[styles.info, {flexBasis: '90%'}]}>
            {order?.transport ? 'Hỗ trợ Vận chuyển' : 'Không hỗ trợ vận chuyển'}
          </Text>
        </View>
      </View>

      <View style={styles.productImage}>
        <View style={styles.imageWrapper}>
          <Image
            source={getImage(order?.fruit?.images[0]?.url)}
            style={styles.image}
          />
        </View>

        <TouchableOpacity style={styles.imageWrapper}>
          <Image
            source={getImageFarmer(order?.farmer?.avatar)}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
