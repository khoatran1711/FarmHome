import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageFruit: {
    width: 120,
    height: 110,
    marginTop: 5,
    marginLeft: 10,
    resizeMode: 'stretch',
  },
  container: {
    width: 140,
    height: 210,
    opacity: 1,
    marginVertical: 5,
  },
  titleContainer: {
    marginTop: 125,
  },
  title: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 11,
    color: Colors.White,
    textAlign: 'center',
  },
});
