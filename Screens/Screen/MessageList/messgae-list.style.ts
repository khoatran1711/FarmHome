import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TimberGreen,
    paddingHorizontal: '3%',
    paddingTop: 20,
  },
  chatBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userImageContainer: {
    width: DEVICE.WIDTH * 0.16,
    height: DEVICE.WIDTH * 0.16,
    borderRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  userChatContainer: {
    width: '84%',
    paddingHorizontal: '5%',
  },
  userChat: {
    color: Colors.Solitaire,
    fontSize: FontSize.Normal,
  },
  userChatContent: {
    color: Colors.Solitaire90,
    fontSize: FontSize.Small,
  },
  line: {
    width: '74%',
    alignSelf: 'flex-end',
    height: 1,
    marginTop: 4,
    backgroundColor: Colors.Solitaire90,
  },
});
