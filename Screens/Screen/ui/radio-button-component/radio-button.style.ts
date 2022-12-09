import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderColor: Colors.DarkGreen,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.DarkGreen,
    marginLeft: 10,
  },
});
