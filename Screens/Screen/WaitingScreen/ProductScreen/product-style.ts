import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  productName: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Large,
    fontWeight: '800',
    marginBottom: 10,
  },
  productImage: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    fontWeight: '300',
  },
  container: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageHeaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    width: '50%',
    height: '50%',
  },
  productContainer: {
    paddingHorizontal: '5%',
    marginTop: 30,
  },
  productCardArea: {
    marginTop: 30,
  },
  productCard: {
    width: '90%',
    backgroundColor: Colors.White,
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: '5%',
  },
  productCardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  timeTitle: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumSmall,
    fontWeight: '400',
    textAlignVertical: 'bottom',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  dealingShopImage: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20,
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.DarkGreen,
    marginVertical: 10,
  },
  optionContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: Colors.Seashell,
  },
  options: {
    flexDirection: 'row',
    marginTop: 10,
  },
  infoOption: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    fontWeight: '300',
    textAlign: 'center',
  },
});
