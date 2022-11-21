import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  imageHeaderContainer: {
    width: 40,
    height: 40,
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
