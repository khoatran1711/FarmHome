import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.TimberGreen,
  },
  banner: {
    width: '100%',
    height: DEVICE.HEIGHT * 0.4,
  },
  farmhomeTitle: {
    color: '#FEF4E3',
    fontSize: FontSize.Large,
    textAlign: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    marginTop: 10,
  },
  loginButton: {
    width: '45%',
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: Colors.Solitaire,
  },
  signupButton: {
    width: '45%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
