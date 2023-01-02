import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  agreeIcon,
  backIcon,
  deleteIcon,
  disAgreeIcon,
} from '../../../constants/assets.constants';
import {
  acceptOrder,
  deleteOrder,
  getOrderDetail,
} from '../../../services/orders.service';
import {I18n} from '../../../translation';
import {getImage} from '../../../utilities/format-utilities';
import {getImageFarmer} from '../../../utilities/help-utilities';
import {
  globalGoBack,
  globalNavigate,
} from '../../../utilities/navigator-utilities';
import {Order, STATUS_CODE_ORDER} from '../../Models/order.model';
import {WaitingComponent} from '../../ui/waiting-component/waiting.component';
import {styles} from './product-style';

export const ProductWaitingDetail = ({route}: any) => {
  const params = route?.params;
  const orderId = params?.orderId;
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);

  const deleteOr = idOrder => {
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
            globalNavigate('WaitingScreen', {isLoading: 'loading'});
          } else {
            ToastAndroid.show(
              I18n.somethingWentWrongPleaseTryAgain,
              ToastAndroid.SHORT,
            );
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
    setOrder(data);
  };

  useEffect(() => {
    getData(orderId);
  }, [orderId]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.imageHeaderContainer}
              onPress={() => globalGoBack()}>
              <Image source={backIcon} style={styles.imageHeader} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageHeaderContainer}
              onPress={() => deleteOr(orderId)}>
              <Image source={deleteIcon} style={styles.imageHeader} />
            </TouchableOpacity>
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>{order?.fruit?.name}</Text>

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
          </View>

          <View style={styles.productCardArea}>
            <ProductCard order={order} />
            {order?.status?.name === STATUS_CODE_ORDER.DEALING && (
              <ProductDealing order={order} />
            )}
          </View>
        </ScrollView>
      ) : (
        <WaitingComponent />
      )}
    </View>
  );
};

const ProductCard = ({order}: {order: Order}) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.productCardImage}>
        <Image
          source={getImage(order?.fruit?.images[0]?.url)}
          style={styles.image}
        />
      </View>
      <Text style={styles.productName}>{order?.fruit?.name}</Text>
      <Text style={styles.info}>
        {I18n.amount}: {order?.amount} {order?.fruit?.unit}
      </Text>
      <Text style={styles.info}>
        {I18n.price} :{order?.price}.000đ/{order?.fruit?.unit}
      </Text>
      <Text style={styles.info}>
        {order?.transport ? I18n.transportSupport : I18n.notTransportSupport}
      </Text>
    </View>
  );
};

const ProductDealing = ({order}: {order: Order}) => {
  const accept = async () => {
    const response = await acceptOrder(order?.id);
    const data = response?.data;

    if (response?.isSuccess) {
      ToastAndroid.show(I18n.updateSuccessfully, ToastAndroid.SHORT);
      globalNavigate('WaitingScreen', {isLoading: 'loading'});
    } else {
      ToastAndroid.show(
        I18n.somethingWentWrongPleaseTryAgain,
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <>
      <Text style={styles.timeTitle}>{order?.date}</Text>
      <TouchableOpacity style={styles.dealingShopImage}>
        <Image
          source={getImageFarmer(order?.farmer?.avatar)}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.productCard}>
        <View style={styles.productCardImage}>
          <Image
            source={getImage(order?.fruit?.images[0]?.url)}
            style={styles.image}
          />
        </View>
        <Text style={styles.productName}>{order?.fruit?.name}</Text>
        <Text style={styles.info}>
          {I18n.price}: {order?.dealPrice}.000đ/{order?.fruit?.unit}
        </Text>
        <Text style={styles.info}>
          {I18n.newAmount}: {order?.dealAmount} {order?.fruit?.unit}
        </Text>
        <View style={styles.line} />
        <Text style={styles.info}>{I18n.orderInfoChange}</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => accept()}>
            <View style={styles.optionImage}>
              <Image source={agreeIcon} style={styles.image} />
            </View>
            <Text style={styles.infoOption}>{I18n.agreeOrderChange}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionImage}>
              <Image source={disAgreeIcon} style={styles.image} />
            </View>
            <Text style={styles.infoOption}>{I18n.disagreeOrderChange}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
