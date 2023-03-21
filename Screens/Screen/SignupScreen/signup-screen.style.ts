import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.TimberGreen,
  },
  imageSignup: {
    width: '100%',
    height: DEVICE.HEIGHT * 0.4,
  },
  wrapperContainer: {
    marginTop: 10,
  },
  signupButton: {
    width: '45%',
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: Colors.Solitaire,
  },
  loginButton: {
    width: '45%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
