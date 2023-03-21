import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkGreen,
  },
  goBackContainer: {
    paddingLeft: '3%',
    marginTop: 10,
  },
  storeImageContainer: {
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'absolute',
    top: 60,
    left: -60,
    zIndex: 50,
  },

  backgroundLine: {
    width: '120%',
    height: 200,
    resizeMode: 'stretch',
    zIndex: 0,
  },

  storeDescription: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    alignSelf: 'center',
    marginTop: 10,
    width: '90%',
    textAlign: 'center',
  },
  storeInfoContainer: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingBottom: 20,
  },
  contactInfoTitle: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.White,
    fontSize: FontSize.MediumLarge,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.White,
    paddingVertical: 3,
    marginBottom: 20,
  },

  productAreaContainer: {
    width: '100%',
    paddingHorizontal: '5%',
  },
  productsTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    color: Colors.White,
    fontSize: FontSize.Small,
    marginTop: 8,
  },
  productContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  productBackground: {
    flexBasis: '98%',
    backgroundColor: Colors.FilterGreen,
    height: 100,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  productImageBackground: {
    width: '35%',
    height: '90%',
    marginTop: '2%',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: '2%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  productInfoContainer: {
    width: '63%',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
  },
  productName: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: FontSize.Small,
  },
  productAmount: {
    color: Colors.White,
    fontSize: FontSize.Small,
  },
  productPublishDate: {
    color: Colors.White,
    fontSize: FontSize.Small,
  },
  productDescription: {
    color: Colors.White,
    fontSize: FontSize.Small,
  },

  imageBackground: {
    width: DEVICE.WIDTH,
    height: 340,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageFarmerContainer: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 80,
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  storeName: {
    textAlign: 'center',
    color: Colors.Solitaire,
    fontSize: FontSize.Large,
  },
  mediumLine: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: Colors.Solitaire,
    height: 1,
    marginTop: 20,
  },
  line: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.Solitaire,
    height: 1,
    marginTop: 20,
  },
  contactInfo: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  phoneNumber: {
    color: Colors.Solitaire,
    fontSize: FontSize.Normal,
    fontWeight: '600',
  },
  contactContent: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    width: '100%',
  },
  verticalLine: {
    width: 1,
    backgroundColor: Colors.Solitaire,
    height: '100%',
  },
  buttonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 35,
    height: 35,
    backgroundColor: Colors.Solitaire,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },
});
