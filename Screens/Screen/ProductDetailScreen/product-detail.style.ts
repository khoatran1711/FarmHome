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
    height: 170,
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
  },
  farmerInfo: {
    fontSize: FontSize.Small,
    fontWeight: '400',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});
