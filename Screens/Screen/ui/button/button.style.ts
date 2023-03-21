import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 38,
    borderRadius: 10,
    borderColor: Colors.Solitaire,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    textAlign: 'center',
  },
});
