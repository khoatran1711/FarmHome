import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageFruit: {
    width: 80,
    height: 90,
    marginTop: 10,
    marginLeft: 15,
    resizeMode: 'stretch',
  },
  container: {
    width: 110,
    height: 170,
    opacity: 1,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  titleContainer: {
    marginTop: 100,
  },
  title: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 11,
    color: Colors.White,
    textAlign: 'center',
  },
});
