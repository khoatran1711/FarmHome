import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 42,
    flexDirection: 'row',
    marginVertical: 5,
  },
  iconContainer: {
    width: '20%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 40,
    overflow: 'hidden',
    padding: 9,
    backgroundColor: Colors.Solitaire,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    width: '80%',
    justifyContent: 'space-between',
    borderColor: Colors.Solitaire,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: FontSize.MediumSmall,
    color: Colors.Solitaire,
  },
});
