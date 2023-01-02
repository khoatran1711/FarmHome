import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  imageLogin: {
    width: '70%',
    height: '50%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 30,
    paddingHorizontal: '5%',
  },
  loginTitle: {
    alignItems: 'center',
    fontSize: FontSize.ExtraLarge,
    color: Colors.DarkGreen,
    textAlign: 'center',
    fontWeight: '800',
  },
  input: {
    alignItems: 'center',
    marginVertical: 10,
  },
  inputTitle: {
    width: '100%',
    color: Colors.DarkGreen,
    fontSize: FontSize.Normal,
  },
  inputPlace: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumSmall,
    borderBottomWidth: 1,
    borderBottomColor: Colors.DarkGreen,
    paddingVertical: 0,
    width: '100%',
  },
  imageSignup: {
    width: '50%',
    height: 250,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  button: {
    width: '100%',
  },
  buttonContainer: {
    width: '30%',
    backgroundColor: Colors.DarkGreen,
    borderRadius: 30,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonTitle: {
    color: Colors.White,
    fontSize: FontSize.MediumSmall,
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signinStatus: {
    width: 8,
    height: 20,
    backgroundColor: Colors.DarkGreen,
    borderRadius: 10,
    marginRight: 10,
  },
  signupStatus: {
    width: 6,
    height: 14,
    backgroundColor: Colors.DarkGreen,
    borderRadius: 10,
    marginRight: 10,
  },
  switchTitle: {
    width: '100%',
    fontSize: FontSize.MediumSmall,
    color: Colors.DarkGreen,
  },
  componentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  tabContainer: {
    height: '90%',
    overflow: 'visible',
    flexDirection: 'row',
  },
  addressInput: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.DarkGreen,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  infoInputContainer: {},
  switchButton: {
    marginTop: 20,
  },
});
