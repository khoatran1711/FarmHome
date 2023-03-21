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
  inputContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.Finlandia,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: FontSize.Normal,
    color: Colors.Solitaire,
    textAlignVertical: 'center',
  },
});
