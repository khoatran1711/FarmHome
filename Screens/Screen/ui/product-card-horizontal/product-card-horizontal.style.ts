import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  imageFruit: {
    width: 90,
    height: 90,
    marginTop: 5,
    marginLeft: '5%',
    resizeMode: 'stretch',
  },
  container: {
    width: '94%',
    height: 100,
    opacity: 1,
    alignSelf: 'center',
    marginVertical: 5,
  },
  priceTitle: {
    fontSize: FontSize.Small,
    color: Colors.Solitaire,
    marginLeft: '2%',
    borderRadius: 5,
    marginTop: 75,
    fontWeight: '600',
    width: '18%',
    height: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.Finlandia,
  },
  title: {
    width: '100%',
    alignSelf: 'center',
    fontSize: FontSize.Small,
    color: Colors.TimberGreen,
    textAlign: 'right',
    fontWeight: '400',
  },
  titleName: {
    width: '100%',
    alignSelf: 'center',
    fontSize: FontSize.Small,
    fontWeight: '600',
    color: Colors.TimberGreen,
    textAlign: 'right',
  },
  titleDescription: {
    width: '100%',
    alignSelf: 'center',
    fontSize: FontSize.SemiSmall,
    fontWeight: '400',
    color: Colors.TimberGreen,
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
    width: '60%',
    alignSelf: 'center',
    marginLeft: '15%',
  },
});
