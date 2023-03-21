import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageFruit: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginLeft: 10,
    resizeMode: 'stretch',
  },
  container: {
    width: 100,
    height: 150,
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
    fontSize: FontSize.Small,
    color: Colors.TimberGreen,
    textAlign: 'center',
  },
});
