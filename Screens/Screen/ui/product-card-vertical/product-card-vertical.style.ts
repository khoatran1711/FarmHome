import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 220,
    marginVertical: 10,
  },
  imageProduct: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    marginTop: 20,
    alignSelf: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    marginTop: -100,
  },
  content: {
    marginTop: 120,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    height: 95,
  },
  firstContent: {
    width: '100%',
    alignItems: 'center',
  },
  productName: {
    color: Colors.TimberGreen,
    fontSize: FontSize.MediumSmall,
    fontWeight: '600',
  },
  productDescription: {
    color: Colors.TimberGreen,
    fontSize: FontSize.ExtraSmall,
  },
  priceContainer: {
    width: '60%',
    height: 20,
    backgroundColor: Colors.Finlandia,
    marginTop: 6,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPrice: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    fontWeight: '600',
  },
  farmerName: {
    color: Colors.TimberGreen,
    fontSize: FontSize.ExtraSmall,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  farmerLocation: {
    color: Colors.TimberGreen,
    fontSize: FontSize.ExtraSmall,
    alignSelf: 'flex-end',
  },
});
