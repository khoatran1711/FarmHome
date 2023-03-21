import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderColor: Colors.Solitaire90,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.Solitaire,
    marginLeft: 10,
  },
});
