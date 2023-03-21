import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 80,
    flexDirection: 'row',
    marginVertical: 20,
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginLeft: 13,
    marginTop: 5,
  },
  categoryName: {
    width: '60%',
    marginLeft: '10%',
    textAlign: 'center',
    height: 45,
    marginTop: 30,
    textAlignVertical: 'center',
    fontSize: FontSize.MediumLarge,
    color: Colors.Solitaire,
  },
});
