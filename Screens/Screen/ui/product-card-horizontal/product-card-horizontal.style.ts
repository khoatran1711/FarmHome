import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  imageFruit: {
    width: 120,
    height: 110,
    marginTop: 5,
    marginLeft: '5%',
    resizeMode: 'stretch',
  },
  container: {
    width: '94%',
    height: 130,
    opacity: 1,
    alignSelf: 'center',
    marginVertical: 5,
  },
  priceTitle: {
    fontSize: 11,
    color: Colors.Black,
    marginLeft: '28%',
    marginTop: 93,
    fontWeight: '600',
    width: '21%',
    height: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    width: '100%',
    alignSelf: 'center',
    fontSize: 11,
    color: Colors.White,
    textAlign: 'right',
  },
  titleName: {
    width: '100%',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.White,
    textAlign: 'right',
  },
  storeImage: {
    width: 25,
    height: 25,
    resizeMode: 'center',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  content: {
    width: '40%',
    alignSelf: 'center',
    marginLeft: '5%',
  },
});
