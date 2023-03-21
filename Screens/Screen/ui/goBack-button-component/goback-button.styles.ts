import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  imageHeaderContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    width: '50%',
    height: '50%',
  },
});
