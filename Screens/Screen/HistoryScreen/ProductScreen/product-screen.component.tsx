import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  backIcon,
  banner,
  billDetailBackground,
  deleteIcon,
  phoneIcon,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';
import {OrderStatus} from '../../../constants/status.constant';
import {getOrderHistoryDetail} from '../../../services/orders.service';
import {I18n} from '../../../translation';
import {getImage} from '../../../utilities/format-utilities';
import {
  callNumber,
  convertDateJsonToDate,
  getFarmerLocation,
  getImageFarmer,
} from '../../../utilities/help-utilities';
import {globalGoBack} from '../../../utilities/navigator-utilities';
import {OrderHistory} from '../../Models/order.model';
import {User} from '../../Models/user.model';
import {GoBackButton} from '../../ui/goBack-button-component/goback-button.component';
import {ProductInformation} from '../../ui/product-information';
import {WaitingComponent} from '../../ui/waiting-component/waiting.component';
import {styles} from './product-screen.style';

export const ProductHistoryDetail = ({route}: {route: any}) => {
  const orderHistoryId = route?.params;
  const [loading, setLoading] = useState(false);
  const [orderHistoryDetail, setOrderHistoryDetail] = useState<OrderHistory>();

  const getData = async () => {
    setLoading(true);
    const response = await getOrderHistoryDetail(orderHistoryId);
    const data = response?.data;
    setOrderHistoryDetail(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [orderHistoryId]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <GoBackButton />
          </View>

          <ImageBackground
            source={billDetailBackground}
            resizeMode={'stretch'}
            style={styles.imageBackground}>
            {!loading && (
              <>
                <ProductInformation order={orderHistoryDetail} />
                <FarmerContact farmer={orderHistoryDetail?.farmer} />

                {orderHistoryDetail?.status?.name === OrderStatus.Fail && (
                  <View style={styles.contentContainer}>
                    <Text style={[styles.titleSmall, {color: Colors.RumRed}]}>
                      {I18n.orderBeingReport}, {I18n.reason}:
                    </Text>

                    <Text
                      style={[
                        styles.titleSmall,
                        {
                          color: Colors.RumRed,
                          fontSize: FontSize.Normal,
                          fontWeight: '500',
                        },
                      ]}>
                      {orderHistoryDetail?.failReason}
                    </Text>
                  </View>
                )}
                <View style={styles.contentContainer}>
                  <View style={styles.horizontalLine} />

                  <Text style={styles.titleSmall}>
                    {I18n.thankYouForBuying}
                  </Text>

                  <View style={styles.smallHorizontalLine} />

                  <Text style={styles.titleSmall}>
                    {I18n.ifYouHaveAnyProblem}
                  </Text>

                  <View style={styles.horizontalLine} />
                </View>

                {orderHistoryDetail?.status?.name !== OrderStatus.Fail && (
                  <Text style={styles.titleSmall}>
                    {I18n.createAt +
                      convertDateJsonToDate(orderHistoryDetail?.date)}
                  </Text>
                )}
              </>
            )}
          </ImageBackground>
        </ScrollView>
      </View>
      {loading && <WaitingComponent />}
    </>
  );
};

const FarmerContact = ({farmer}: {farmer?: User}) => {
  return (
    <View style={styles.farmerContactContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.farmerImage}>
          <Image source={getImageFarmer(farmer?.avatar)} style={styles.image} />
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.smallTitleBold}>
            {farmer?.firstName + ' ' + farmer?.lastName}
          </Text>
          <Text style={styles.semiTitle}>{farmer?.email}</Text>

          <Text style={styles.semiTitle}>
            {getFarmerLocation(farmer?.location)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.phoneButton}
        onPress={() => callNumber(farmer?.phone)}>
        <Image source={phoneIcon} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};
