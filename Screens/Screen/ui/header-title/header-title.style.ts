import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 5,
  },
  header: {
    color: Colors.Solitaire,
    textAlign: 'center',
    fontSize: FontSize.Large,
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.Solitaire,
  },
});
