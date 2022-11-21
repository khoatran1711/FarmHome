import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkGreen,
  },
  imageProductBackground: {
    backgroundColor: Colors.Black,
    width: '100%',
    height: 200,
    paddingHorizontal: '3%',
    paddingTop: 10,
  },
  imageContainer: {
    marginLeft: '10%',
    width: '80%',
    height: 200,
    marginTop: -120,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  productInformation: {
    width: '50%',
    marginTop: 20,
    marginLeft: '10%',
  },
  productName: {
    fontSize: FontSize.Large,
    fontWeight: '800',
  },
  productDescription: {
    fontSize: FontSize.MediumSmall,
    fontWeight: '400',
  },
  farmerInformation: {
    marginTop: 20,
  },
  farmerTitle: {
    fontSize: FontSize.Normal,
    fontWeight: '600',
    marginBottom: 10,
  },
  farmerInfo: {
    fontSize: FontSize.Small,
    fontWeight: '400',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  rightButton: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inStockUp: {
    width: '90%',
    backgroundColor: Colors.DarkFuelGreen,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  inStockUpTitle: {
    fontSize: FontSize.NormalSmall,
    fontWeight: '500',
  },
  inStockUpNumber: {
    fontSize: FontSize.NormalSmall,
    fontWeight: '500',
  },
  viewShopContainer: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  viewShopTitle: {
    fontSize: FontSize.Small,
    fontWeight: '400',
    color: Colors.DarkFuelGreen,
  },
  phoneNowTitle: {
    fontSize: FontSize.Small,
    fontWeight: '400',
    color: Colors.DarkFuelGreen,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.DarkFuelGreen,
    marginBottom: 10,
  },
  headerContainer: {},
  imageProductContainer: {},
  iconImage: {},
});
