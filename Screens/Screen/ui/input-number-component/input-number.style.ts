import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  inputText: {
    flexDirection: 'row',
    borderColor: Colors.Solitaire90,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.Solitaire,
    paddingHorizontal: 10,
    fontSize: FontSize.Normal,
  },
});
