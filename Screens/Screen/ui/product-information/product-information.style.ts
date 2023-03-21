import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {DEVICE} from '../../../constants/devices.constant';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  imageHeaderContainer: {
    width: DEVICE.WIDTH * 0.5,
    height: DEVICE.WIDTH * 0.5,
    borderRadius: DEVICE.WIDTH * 0.5,
    borderColor: Colors.Finlandia,
    borderWidth: 1,
  },
  imageHeader: {
    width: '100%',
    height: '100%',
    borderRadius: DEVICE.WIDTH * 0.5,
    overflow: 'hidden',
    marginTop: -5,
    marginLeft: -5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  productName: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Large,
    fontWeight: '700',
    textAlign: 'center',
    width: '48%',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  verticalLine: {
    width: 2,
    height: 20,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: Colors.TimberGreen,
  },
  locationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 5,
  },
  location: {
    width: '100%',
    textAlign: 'center',
    color: Colors.TimberGreen,
    fontSize: FontSize.Small,
  },
});
