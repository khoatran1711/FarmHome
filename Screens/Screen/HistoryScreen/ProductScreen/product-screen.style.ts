import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {DEVICE} from '../../../constants/devices.constant';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  productName: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumLarge,
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
    backgroundColor: Colors.Solitaire,
  },
  headerContainer: {
    marginTop: 20,
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
    marginVertical: 30,
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
    height: 400,
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
  infoTime: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.DarkGreen,
    marginVertical: 10,
  },
  infoTitle: {
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    fontWeight: '500',
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: DEVICE.WIDTH,
    minHeight: DEVICE.HEIGHT - 70,
    paddingTop: 35,
    paddingHorizontal: '3%',
    overflow: 'scroll',
  },
  contentContainer: {
    marginVertical: 10,
  },
  horizontalLine: {
    width: '70%',
    height: 1,
    backgroundColor: Colors.TimberGreen,
    alignSelf: 'center',
    marginVertical: 10,
  },
  titleSmall: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Small,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  smallHorizontalLine: {
    width: '40%',
    height: 1,
    backgroundColor: Colors.TimberGreen,
    alignSelf: 'center',
    marginVertical: 10,
  },
  farmerContactContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 70,
    backgroundColor: Colors.Sidecar,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  farmerImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
  },
  infoContent: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  smallTitleBold: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Small,
    fontWeight: '700',
  },
  semiTitle: {
    color: Colors.TimberGreen,
    fontSize: FontSize.SemiSmall,
  },
  phoneButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Sidecar,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
});
