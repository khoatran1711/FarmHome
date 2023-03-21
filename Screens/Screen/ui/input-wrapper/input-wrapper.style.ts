import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  label: {
    color: Colors.Solitaire,
    fontSize: FontSize.Normal,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.Finlandia,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: FontSize.Normal,
    color: Colors.Solitaire,
  },
  readOnly: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.Finlandia,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: FontSize.Normal,
    color: Colors.Solitaire,
  },
  iconContainer: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
