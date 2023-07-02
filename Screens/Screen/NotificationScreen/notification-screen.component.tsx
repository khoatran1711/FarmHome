import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {banner, notificationBackground} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {NotificationService} from '../../services/notification.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getDateBefore, getImageFarmer} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {NotificationResponse} from '../Models/notification.model';
import {HeaderTitle} from '../ui/header-title';
import {styles} from './notification-screen.style';

export const toastConfig = {
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  orderToast: ({text1, text2, props}) => (
    <TouchableOpacity
      style={styles.toastNotificationContainer}
      onPress={props?.onClick}>
      <ImageBackground
        source={notificationBackground}
        resizeMode="stretch"
        style={styles.toastNotificationImageBackground}>
        <View style={styles.toastNotificationImage}>
          <Image source={getImage(props?.image)} style={styles.image} />
        </View>
        <View style={styles.toastNotificationContent}>
          <Text numberOfLines={1} style={styles.toastNotificationContentTitle}>
            {text1}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.toastNotificationContentDescription}>
            {text2}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ),
};

export const NotificationScreen = () => {
  const [loading, setLoading] = useState(false);
  const notificationService = new NotificationService();
  const [notificationList, setNotificationList] = useState<
    NotificationResponse[]
  >([]);
  const userId = useRootSelector(AuthenticationSelectors.idSelector);

  const getData = async () => {
    if (userId) {
      setLoading(true);
      const response = await notificationService.getAllNotifications(userId);
      setNotificationList(response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(notificationList);

  return (
    <>
      <View style={styles.notificationListContainer}>
        <HeaderTitle title={I18n.notification.toUpperCase()} />
        <ScrollView>
          {notificationList?.map(e => (
            <Notification notification={e} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export const Notification = ({
  notification,
}: {
  notification: NotificationResponse;
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.notificationContainer,
          notification?.isRead && {backgroundColor: Colors.TimberGreen},
        ]}>
        <View style={styles.notificationImage}>
          <Image
            source={getImageFarmer(notification?.imgUrl)}
            style={styles.image}
          />
        </View>
        <View style={styles.notificationContent}>
          <Text numberOfLines={1} style={styles.notificationContentHeader}>
            {notification?.title}
          </Text>
          <Text numberOfLines={3} style={styles.notificationContentTitle}>
            {notification?.content}
          </Text>
          <Text numberOfLines={1} style={styles.notificationContentTime}>
            {notification?.date && getDateBefore(notification?.date)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
