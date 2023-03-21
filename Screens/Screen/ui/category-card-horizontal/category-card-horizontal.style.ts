import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';

export const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 50,
    backgroundColor: Colors.Finlandia,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.MoonMist,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
  nameContainer: {
    width: '55%',
    alignItems: 'flex-end',
  },
  name: {
    color: Colors.Solitaire,
    marginRight: 10,
    textAlign: 'right',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.Solitaire,
    marginTop: 3,
  },
});
