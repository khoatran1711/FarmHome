import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  notificationListContainer: {
    flex: 1,
    backgroundColor: Colors.TimberGreen,
    paddingHorizontal: '3%',
    paddingTop: 20,
  },
  notificationContainer: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    backgroundColor: Colors.Solitaire + '30',
  },
  notificationImage: {
    width: 70,
    height: 70,
    borderRadius: 80,
    overflow: 'hidden',
    maxWidth: '30%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  notificationContent: {
    width: '70%',
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: '3%',
  },
  notificationContentTitle: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    fontWeight: '300',
  },
  notificationContentHeader: {
    color: Colors.Solitaire,
    fontSize: FontSize.Normal,
  },
  notificationContentTime: {
    color: Colors.Solitaire90,
    fontSize: FontSize.SemiSmall,
  },
  toastNotificationContainer: {
    height: 60,
    width: '100%',
    marginTop: -40,
  },
  toastNotificationImageBackground: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toastNotificationImage: {
    width: 40,
    height: 40,
    borderRadius: 45,
    overflow: 'hidden',
    alignSelf: 'center',
    marginLeft: '5%',
  },
  toastNotificationContent: {
    width: '75%',
    marginRight: '5%',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: 5,
  },
  toastNotificationContentTitle: {
    fontSize: FontSize.Normal,
    color: Colors.Solitaire,
  },
  toastNotificationContentDescription: {
    fontSize: FontSize.Small,
    color: Colors.Solitaire90,
  },
});
