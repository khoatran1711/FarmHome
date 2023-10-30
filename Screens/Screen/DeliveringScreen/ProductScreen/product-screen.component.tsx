import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  chatIcon,
  orderDetailBackground,
  phoneIcon,
  priceIcon,
  validAmountIcon,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';
import {ScreenName} from '../../../constants/screen-name.constant';
import {OrderStatus} from '../../../constants/status.constant';
import {useRootSelector} from '../../../domain/hooks';
import {acceptOrder, OrderService} from '../../../services/orders.service';
import {DeliveryListSelectors} from '../../../state/delivering-list/delivering-list.selector';
import {I18n} from '../../../translation';
import {
  callNumber,
  ErrorHandle,
  getImageFarmer,
  PopupShow,
} from '../../../utilities/help-utilities';
import {globalNavigate} from '../../../utilities/navigator-utilities';
import {STATUS_CODE_ORDER} from '../../Models/order.model';
import {User} from '../../Models/user.model';
import {CustomBottomSheet} from '../../ui/bottom-sheet-component/bottom-sheet.component';
import {Button} from '../../ui/button';
import {GoBackButton} from '../../ui/goBack-button-component/goback-button.component';
import {InputWrapper} from '../../ui/input-wrapper';
import {ProductInformation} from '../../ui/product-information';
import {WaitingComponent} from '../../ui/waiting-component/waiting.component';
import {styles} from './product-screen.style';

export const ProductDeliveryDetail = ({route}: any) => {
  const params = route?.params;
  const orderId = params?.orderId;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const orderService = new OrderService();
  const isLoading = useRootSelector(DeliveryListSelectors.isLoadingSelector);
  const order = useRootSelector(DeliveryListSelectors.currentOrderSelector);

  const completeOr = async orderId => {
    setLoading(true);
    const response: any = await orderService.completeDelivery(orderId);

    if (response?.data.success === 'true') {
      PopupShow(I18n.updateSuccessfully, I18n.youHaveReceiveOrder);
      globalNavigate(ScreenName.DeliveryScreen, {isLoading: 'loading'});
    } else {
      ErrorHandle(I18n.fail, I18n.somethingWentWrongPleaseTryAgain);
    }
    setLoading(false);
  };

  useEffect(() => {
    //getData(orderId);
    orderService.getCurrentDelivery(orderId);
  }, [orderId]);

  return (
    <>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <ScrollView>
            <View style={styles.header}>
              <GoBackButton />
            </View>

            <ImageBackground
              source={orderDetailBackground}
              resizeMode={'stretch'}
              style={styles.imageBackground}>
              {!loading && !isLoading && (
                <>
                  {order && <ProductInformation order={order} />}
                  <FarmerContact
                    farmer={order?.farmer}
                    status={order?.status?.name}
                  />

                  <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                    <Text
                      style={{
                        color: Colors.TimberGreen,
                        fontSize: FontSize.Small,
                      }}>
                      {I18n.yourOrderWillBeDeliveryBefore}
                      <Text
                        style={{
                          color: Colors.TimberGreen,
                          fontSize: FontSize.Normal,
                          fontWeight: '700',
                        }}>
                        20-05-2023
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: Colors.TimberGreen,
                        fontSize: FontSize.SemiSmall,
                        fontStyle: 'italic',
                      }}>
                      {I18n.ifYouHaveNotReceivedReport}
                    </Text>

                    <View>
                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: Colors.TimberGreen,
                          marginVertical: 20,
                        }}
                      />

                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          backgroundColor: Colors.Finlandia,
                          borderRadius: 10,
                          paddingVertical: 10,
                        }}
                        onPress={() => completeOr(order?.id)}>
                        <Text
                          style={{
                            color: Colors.Solitaire,
                            fontSize: FontSize.Small,
                            fontWeight: '600',
                            paddingHorizontal: 10,
                            textAlign: 'center',
                          }}>
                          {I18n.iHaveReceived}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          borderColor: Colors.Finlandia,
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingVertical: 10,
                          marginVertical: 10,
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            color: Colors.TimberGreen,
                            fontSize: FontSize.Small,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          {I18n.iStillNotHaveReceived}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </ImageBackground>
          </ScrollView>

          <CustomBottomSheet
            visible={show}
            children={
              <Contact idOrder={order?.id} farmerId={order?.farmer?.id} />
            }
            onClose={() => {
              setShow(false);
            }}
            height={'65%'}
          />
        </GestureHandlerRootView>
      </View>
      {(loading || isLoading) && <WaitingComponent />}
    </>
  );
};

const FarmerContact = ({farmer, status}: {farmer?: User; status?: string}) => {
  return (
    <View style={styles.farmerContactContainer}>
      <View style={styles.horizontalLine} />

      <View style={styles.farmerContact}>
        {status !== OrderStatus.Cancel ? (
          <>
            <Text style={styles.smallTitle}>{I18n.waitingForDelivery}</Text>
          </>
        ) : (
          <>
            <Text style={styles.smallTitle}>
              {I18n.yourOrderHasBeenCanceled}
            </Text>
          </>
        )}
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

const Contact = ({
  idOrder,
  farmerId,
}: {
  idOrder?: number;
  farmerId?: number;
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const orderService = new OrderService();

  const reportOr = async orderId => {
    if (idOrder && farmerId) {
      setLoading(true);
      const response: any = await orderService.report(
        orderId,
        farmerId,
        title,
        content,
      );

      if (response?.data.success === 'false') {
        ErrorHandle(I18n.fail, I18n.somethingWentWrongPleaseTryAgain);
      } else {
        PopupShow(I18n.updateSuccessfully, I18n.youHaveReceiveOrder);
        globalNavigate(ScreenName.DeliveryScreen, {isLoading: 'loading'});
      }
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <InputWrapper
          label={I18n.reportReason}
          onTextChange={e => setTitle(e)}
          value={title}
        />
        <InputWrapper
          wrapperStyle={{marginVertical: 10}}
          label={I18n.reportContent}
          multipleLine={true}
          onTextChange={e => setContent(e)}
          value={content}
          textInputStyle={{height: 'auto', minHeight: 120, maxHeight: 180}}
        />

        <TouchableOpacity
          disabled={
            content?.trim() === '' || title?.trim() === '' || loading
              ? true
              : false
          }
          style={
            content?.trim() === '' || title?.trim() === ''
              ? {
                  alignSelf: 'center',
                  width: '50%',
                  marginVertical: 20,
                  height: 40,
                  borderRadius: 5,
                  backgroundColor: Colors.GrayAsparagus,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {
                  alignSelf: 'center',
                  width: '50%',
                  marginVertical: 20,
                  height: 40,
                  borderRadius: 5,
                  backgroundColor: Colors.Finlandia,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }
          onPress={() => reportOr(idOrder)}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.Solitaire} />
          ) : (
            <Text
              style={{
                color: Colors.Solitaire,
                fontSize: FontSize.Small,
              }}>
              Báo cáo
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
