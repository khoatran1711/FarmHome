import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {backIcon, deleteIcon} from '../../../constants/assets.constants';
import {getOrderHistoryDetail} from '../../../services/orders.service';
import {I18n} from '../../../translation';
import {getImage} from '../../../utilities/format-utilities';
import {getImageFarmer} from '../../../utilities/help-utilities';
import {globalGoBack} from '../../../utilities/navigator-utilities';
import {OrderHistory} from '../../Models/order.model';
import {WaitingComponent} from '../../ui/waiting-component/waiting.component';
import {styles} from './product-style';

export const ProductHistoryDetail = ({route}: {route: any}) => {
  const orderHistoryId = route?.params;
  const [loading, setLoading] = useState(false);
  const [orderHistoryDetail, setOrderHistoryDetail] = useState<OrderHistory>();
  console.log(orderHistoryId);
  const getData = async () => {
    setLoading(true);
    const response = await getOrderHistoryDetail(orderHistoryId);
    const data = response?.data;
    console.log(response);
    setOrderHistoryDetail(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [orderHistoryId]);

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.imageHeaderContainer}
              onPress={() => globalGoBack()}>
              <Image source={backIcon} style={styles.imageHeader} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageHeaderContainer}>
              <Image source={deleteIcon} style={styles.imageHeader} />
            </TouchableOpacity>
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productName}>
              {orderHistoryDetail?.fruit?.name}
            </Text>

            <View style={styles.productImage}>
              <View style={styles.imageWrapper}>
                <Image
                  source={getImage(orderHistoryDetail?.fruit?.images[0]?.url)}
                  style={styles.image}
                />
              </View>

              <TouchableOpacity style={styles.imageWrapper}>
                <Image
                  source={getImageFarmer(orderHistoryDetail?.farmer?.avatar)}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.productCardArea}>
            {orderHistoryDetail && (
              <ProductCard orderHistory={orderHistoryDetail} />
            )}
          </View>
        </ScrollView>
      ) : (
        <WaitingComponent />
      )}
    </View>
  );
};

const ProductCard = ({orderHistory}: {orderHistory: OrderHistory}) => {
  return (
    <View style={styles.productCard}>
      <Text style={styles.infoTime}>
        {I18n.boughtAt} {orderHistory?.date}
      </Text>
      <View style={styles.productCardImage}>
        <Image
          source={getImage(orderHistory?.fruit?.images[0]?.url)}
          style={styles.image}
        />
      </View>
      <Text style={styles.productName}>{orderHistory?.fruit?.name}</Text>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <Text style={styles.info}>
            {I18n.amount} : {orderHistory?.amount} {orderHistory?.fruit?.unit}
          </Text>
          <Text style={styles.info}>
            {I18n.price} : {orderHistory?.price}.000đ/
            {orderHistory?.fruit?.unit}
          </Text>
          <Text style={styles.info}>
            {orderHistory?.transport
              ? I18n.transportSupport
              : I18n.notTransportSupport}
          </Text>
        </View>
        <View
          style={{width: '50%', alignItems: 'flex-end', marginVertical: 10}}>
          <Text style={styles.info}>
            {orderHistory?.farmer?.firstName} {orderHistory?.farmer?.lastName}
          </Text>
          <Text style={styles.info}>{orderHistory?.farmer?.phone}</Text>
          <Text style={styles.info}>{orderHistory?.farmer?.email}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text style={styles.infoTitle}>{I18n.thankYouForBuying}</Text>
    </View>
  );
};
