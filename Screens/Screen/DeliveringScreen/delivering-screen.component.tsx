import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {DEVICE} from '../../constants/devices.constant';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {getAllOrders, OrderService} from '../../services/orders.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {DeliveryListSelectors} from '../../state/delivering-list/delivering-list.selector';
import {WaitingListSelectors} from '../../state/waiting-list/waiting-list.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getImageFarmer} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Order, STATUS_CODE_ORDER} from '../Models/order.model';
import {DeliveryCard} from '../ui/delivery-card-component';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {HeaderTitle} from '../ui/header-title';
import {WaitingCard} from '../ui/waiting-card';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './delivering-style.style';

export const DeliveringScreen = (props?: any) => {
  const userId = useRootSelector(AuthenticationSelectors.idSelector);
  const [loading, setLoading] = useState(false);
  const orders = useRootSelector(DeliveryListSelectors.deliveryListSelector);
  const pageNumber = useRootSelector(DeliveryListSelectors.pageNumberSelector);
  const deliveryLoading = useRootSelector(
    DeliveryListSelectors.isLoadingSelector,
  );
  const deliveryService = new OrderService();

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      deliveryService.resetDeliveryList();
    }, 2000);
  };

  let isLoading = props?.route?.params;
  useEffect(() => {
    deliveryService.resetDeliveryList();
    isLoading = false;
  }, [userId, isLoading]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh || deliveryLoading}
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
              pageNumber && deliveryService.getAllOrders();
            }
          }}
          scrollEventThrottle={400}>
          <GoBackButton />
          <HeaderTitle title={I18n.orderDeliveryList.toUpperCase()} />
          {orders?.map(item => (
            <>
              <Text style={styles.dateTitle}>
                {item?.date} {item?.id}
              </Text>
              <DeliveryCard
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
                  globalNavigate(ScreenName.ProductDeliveryScreen, {
                    orderId: item?.id,
                  })
                }
                isNoticed={item?.status?.name === STATUS_CODE_ORDER.DEALING}
                expectDeliveryDate={item?.deliveryDate}
              />
            </>
          ))}
        </ScrollView>
      </View>
      {loading && <WaitingComponent />}
    </>
  );
};
