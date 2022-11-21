import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '3%',
    marginTop: 10,
  },
  wishContainer: {
    marginTop: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishTitle: {
    marginTop: 20,
    color: Colors.DarkGreen80,
    fontSize: FontSize.Normal,
    fontWeight: '400',
  },
  dateTitle: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Large,
    fontWeight: '600',
  },
  timeTitle: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumSmall,
    fontWeight: '400',
    textAlignVertical: 'bottom',
    marginLeft: 10,
  },
  productContainer: {
    marginTop: 20,
  },
  productCardContainer: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingVertical: 10,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  productInfoContainer: {
    width: '70%',
  },
  productName: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumSmall,
    fontWeight: '800',
  },
  productInfo: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  info: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    fontWeight: '300',
    flexBasis: '48%',
  },
  productImage: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageWrapper: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
