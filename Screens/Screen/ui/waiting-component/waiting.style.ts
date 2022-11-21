import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    height: 130,
    shadowOpacity: 1,
    shadowColor: Colors.Black,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  dialogBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    color: Colors.White,
  },
  seasonContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seasonImageContainer: {
    width: 30,
    height: 30,
  },
  seasonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
