import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {DEVICE} from '../../constants/devices.constant';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {getAllOrders, OrderService} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {WaitingListSelectors} from '../../state/waiting-list/waiting-list.selector';
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
  //const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(false);
  const orders = useRootSelector(WaitingListSelectors.waitingListSelector);
  const pageNumber = useRootSelector(WaitingListSelectors.pageNumberSelector);
  const waitingLoading = useRootSelector(
    WaitingListSelectors.isLoadingSelector,
  );
  const waitingService = new OrderService();

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      waitingService.resetWaitingList();
    }, 2000);
  };

  const getData = async Id => {
    setLoading(true);
    const response = await getAllOrders(Id);
    const data = response?.data;
    //setOrders(data?.contents);
    setLoading(false);
  };

  let isLoading = props?.route?.params;
  useEffect(() => {
    getData(userId);
    waitingService.resetWaitingList();
    isLoading = false;
  }, [userId, isLoading]);

  return (
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
                nativeEvent.contentSize.height - DEVICE.HEIGHT + 50 &&
              !isLoading
            ) {
              pageNumber && waitingService.getAllOrders();
            }
          }}
          scrollEventThrottle={400}>
          <GoBackButton />
          <HeaderTitle title={I18n.paymentWaitingList.toUpperCase()} />
          {orders?.map(item => (
            <>
              <Text style={styles.dateTitle}>
                {item?.date} {item?.id}
              </Text>
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
                status={item?.status?.name}
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
