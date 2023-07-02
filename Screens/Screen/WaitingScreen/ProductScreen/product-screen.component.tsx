import {borderRadius} from '@mui/system';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  agreeIcon,
  backIcon,
  banner,
  chatIcon,
  deleteIcon,
  disAgreeIcon,
  locationIcon,
  orderDetailBackground,
  phoneIcon,
  priceIcon,
  transportIcon,
  validAmountIcon,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {DEVICE} from '../../../constants/devices.constant';
import {FontSize} from '../../../constants/fontsize.constants';
import {ScreenName} from '../../../constants/screen-name.constant';
import {useRootSelector} from '../../../domain/hooks';
import {
  acceptOrder,
  deleteOrder,
  getOrderDetail,
  OrderService,
} from '../../../services/orders.service';
import {WaitingListSelectors} from '../../../state/waiting-list/waiting-list.selector';
import {I18n} from '../../../translation';
import {getImage} from '../../../utilities/format-utilities';
import {
  callNumber,
  ErrorHandle,
  getImageFarmer,
} from '../../../utilities/help-utilities';
import {
  globalGoBack,
  globalNavigate,
} from '../../../utilities/navigator-utilities';
import {Farmer} from '../../Models/farmer.model';
import {Order, STATUS_CODE_ORDER} from '../../Models/order.model';
import {User} from '../../Models/user.model';
import {GoBackButton} from '../../ui/goBack-button-component/goback-button.component';
import {IconWithLabel} from '../../ui/icon-with-label';
import {ProductInformation} from '../../ui/product-information';
import {WaitingComponent} from '../../ui/waiting-component/waiting.component';
import {styles} from './product-screen.style';

export const ProductWaitingDetail = ({route}: any) => {
  const params = route?.params;
  const orderId = params?.orderId;
  //const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);
  const orderService = new OrderService();
  const isLoading = useRootSelector(WaitingListSelectors.isLoadingSelector);
  const order = useRootSelector(WaitingListSelectors.currentOrderSelector);

  const onDeleteOrder = idOrder => {
    Alert.alert(I18n.doYouWantToDeleteThisOrder, I18n.youCanNotRecover, [
      // The "Yes" button
      {
        text: I18n.agree,
        onPress: async () => {
          setLoading(true);
          const response = await deleteOrder(idOrder);
          console.log(response);
          getData(orderId);
          setLoading(false);

          if (response?.isSuccess) {
            ToastAndroid.show(I18n.deleteSuccessfully, ToastAndroid.SHORT);
            globalNavigate(ScreenName.WaitingScreen, {isLoading: 'loading'});
          } else {
            ErrorHandle(I18n.fail, I18n.somethingWentWrongPleaseTryAgain);
          }
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: I18n.disagree,
      },
    ]);
  };

  const getData = async orderId => {
    setLoading(true);
    const response = await getOrderDetail(orderId);
    const data = response?.data;
    setLoading(false);
    //setOrder(data);
  };

  const acceptOr = async orderId => {
    setLoading(true);
    const response = await acceptOrder(orderId);
    if (response?.isSuccess) {
      ToastAndroid.show(I18n.updateSuccessfully, ToastAndroid.SHORT);
      globalNavigate(ScreenName.WaitingScreen, {isLoading: 'loading'});
    } else {
      ErrorHandle(I18n.fail, I18n.somethingWentWrongPleaseTryAgain);
    }
    setLoading(false);
  };

  useEffect(() => {
    //getData(orderId);
    orderService.getCurrentOrder(orderId);
  }, [orderId]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <GoBackButton />

            <TouchableOpacity
              style={styles.imageHeaderContainer}
              onPress={() => onDeleteOrder(orderId)}>
              <Image source={deleteIcon} style={styles.imageHeader} />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={orderDetailBackground}
            resizeMode={'stretch'}
            style={styles.imageBackground}>
            {!loading && !isLoading && (
              <>
                {order && <ProductInformation order={order} />}
                <FarmerContact farmer={order?.farmer} />
                {order?.status?.name === STATUS_CODE_ORDER.DEALING && (
                  <DealingCard
                    newAmount={order?.dealAmount}
                    newPrice={order?.dealPrice}
                    unit={order?.fruit?.unit}
                    farmer={order?.farmer}
                    onAccept={() => acceptOr(order?.id)}
                    onDeny={() => onDeleteOrder(order?.id)}
                  />
                )}
              </>
            )}
          </ImageBackground>
        </ScrollView>
      </View>
      {(loading || isLoading) && <WaitingComponent />}
    </>
  );
};

const FarmerContact = ({farmer}: {farmer?: User}) => {
  return (
    <View style={styles.farmerContactContainer}>
      <View style={styles.horizontalLine} />

      <View style={styles.farmerContact}>
        <Text style={styles.smallTitle}>{I18n.waitingForAccept}</Text>
        <Text style={styles.smallTitle}>{I18n.orContactToFarmer}</Text>

        <View style={styles.farmerInfo}>
          <View style={styles.farmerInfoLine} />

          <TouchableOpacity
            style={styles.farmerContainer}
            onPress={() =>
              globalNavigate(ScreenName.StoreDetailScreen, {
                userId: farmer?.id,
              })
            }>
            <View style={styles.farmerImageContainer}>
              <Image
                style={styles.image}
                source={getImageFarmer(farmer?.avatar)}
              />
            </View>

            <Text numberOfLines={2} style={styles.smallTitle}>
              {farmer?.firstName} {farmer?.lastName}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => callNumber(farmer?.phone)}>
            <Image source={phoneIcon} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={() =>
              globalNavigate(ScreenName.MessageDetailScreen, {
                farmerId: farmer?.id,
              })
            }>
            <Image source={chatIcon} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.horizontalLine} />
    </View>
  );
};

interface DealingCardProps {
  newPrice?: number | null;
  newAmount?: number | null;
  unit?: string;
  farmer?: User;
  onAccept?: () => void;
  onDeny?: () => void;
}

const DealingCard = (props?: DealingCardProps) => {
  return (
    <>
      <View style={styles.farmerDealImageContainer}>
        <Image
          style={styles.image}
          source={getImageFarmer(props?.farmer?.avatar)}
        />
      </View>

      <View style={styles.dealingCardContainer}>
        <View style={styles.iconLabelContainer}>
          <View style={styles.iconLabelContainer}>
            <View style={styles.newIcon}>
              <Image source={validAmountIcon} style={styles.image} />
            </View>

            <View style={styles.newContentContainer}>
              <Text style={styles.smallTitle}>{I18n.newAmount}</Text>
              <Text style={styles.normalTitleBold}>
                {props?.newAmount} {props?.unit}
              </Text>
            </View>
          </View>

          <View style={styles.iconLabelContainer}>
            <View style={styles.newIcon}>
              <Image source={priceIcon} style={styles.image} />
            </View>

            <View style={styles.newContentContainer}>
              <Text style={styles.smallTitle}>{I18n.newPrice}</Text>
              <Text style={styles.normalTitleBold}>
                {props?.newPrice}000đ/{props?.unit}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.smallTitleCenter}>{I18n.orderInfoChange}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={props?.onAccept}>
              <View style={styles.agree} />
            </TouchableOpacity>
            <Text style={styles.smallTitleCenter}>{I18n.agreeOrderChange}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.disagreeButton]}
              onPress={props?.onDeny}>
              <Text style={styles.disagree}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.smallTitleCenter}>
              {I18n.disagreeOrderChange}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
