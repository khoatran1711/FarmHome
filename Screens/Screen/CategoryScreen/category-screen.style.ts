import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TimberGreen,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    color: Colors.Solitaire,
    fontSize: FontSize.Large,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
});
