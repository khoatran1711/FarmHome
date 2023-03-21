import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {DEVICE} from '../../../constants/devices.constant';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Solitaire,
  },
  imageHeaderContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeader: {
    width: '55%',
    height: '55%',
  },
  imageBackground: {
    width: DEVICE.WIDTH,
    minHeight: DEVICE.HEIGHT - 70,
    paddingTop: 35,
    paddingHorizontal: '3%',
    overflow: 'scroll',
  },
  backButton: {
    marginLeft: '3%',
    marginTop: 10,
  },
  farmerContactContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.TimberGreen,
  },
  farmerContact: {
    marginVertical: 10,
  },
  smallTitle: {
    color: Colors.TimberGreen,
    fontSize: FontSize.SemiSmall,
  },
  farmerInfo: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 3,
  },
  farmerInfoLine: {
    width: 1,
    backgroundColor: Colors.TimberGreen,
  },
  farmerContainer: {
    width: '60%',
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.Sidecar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  farmerImageContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
  },
  contactButton: {
    width: 30,
    height: 30,
    padding: 7,
    backgroundColor: Colors.Sidecar,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 5,
  },
  dealingCardContainer: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.Sidecar,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Solitaire,
    borderRadius: 10,
    padding: 10,
  },
  normalTitleBold: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Normal,
    fontWeight: '700',
  },
  newContentContainer: {
    marginHorizontal: 13,
  },
  smallTitleCenter: {
    color: Colors.TimberGreen,
    fontSize: FontSize.SemiSmall,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    width: '43%',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.TimberGreen,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agree: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.Solitaire,
  },
  disagree: {
    color: Colors.Solitaire,
    fontSize: FontSize.Normal,
    marginTop: -2,
  },
  disagreeButton: {
    backgroundColor: Colors.Cranberry,
  },
  farmerDealImageContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginLeft: '5%',
    overflow: 'hidden',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginTop: 10,
    justifyContent: 'space-between',
  },
});
