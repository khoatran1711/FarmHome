import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {banner1, exploreBanner2} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {getOrdersHistory, OrderService} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {HistorySelectors} from '../../state/history/history.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {
  convertDateJsonToDate,
  getImageFarmer,
  PopupShow,
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
  //const [historyOrders, setHistoryOrders] = useState<OrderHistory[]>();
  const orderService = new OrderService();
  const historyOrders = useRootSelector(HistorySelectors.historyListSelector);
  const pageNumber = useRootSelector(HistorySelectors.pageNumberSelector);
  const waitingLoading = useRootSelector(HistorySelectors.isLoadingSelector);

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      orderService.resetHistoryList();
    }, 2000);
  };

  const getData = async Id => {
    setLoading(true);

    //const response = await getOrdersHistory(Id);
    //const data = response?.data;
    //setHistoryOrders(data?.contents);
    setLoading(false);
  };

  useEffect(() => {
    getData(userId);
    orderService.resetHistoryList();
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh || waitingLoading}
              onRefresh={() => onRefresh()}
            />
          }
          onScroll={({nativeEvent}) => {
            // Nếu cuộn đến cuối và đang không tải dữ liệu mới
            if (
              nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - DEVICE.HEIGHT + 10
            ) {
              pageNumber !== undefined && orderService.getAllHistory();
            }
          }}
          scrollEventThrottle={400}>
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
                status={item?.status?.name}
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
