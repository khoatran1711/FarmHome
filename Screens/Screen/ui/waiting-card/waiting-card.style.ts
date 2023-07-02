import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 140,
    backgroundColor: Colors.Solitaire,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  headerContainer: {
    paddingVertical: 3,
    borderColor: Colors.TimberGreen,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  farmerImageContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  farmerName: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Small,
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: '600',
  },
  productContainer: {
    flexDirection: 'row',
  },
  productName: {
    color: Colors.TimberGreen,
    fontSize: FontSize.Normal,
    fontWeight: '600',
  },
  infoContainer: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.TimberGreen,
    marginLeft: 5,
  },
  infoTitle: {
    color: Colors.TimberGreen,
    fontSize: FontSize.SemiSmall,
    fontWeight: '600',
    textAlignVertical: 'center',
    marginLeft: 7,
  },
  waitingTitle: {
    color: Colors.TimberGreen,
    fontSize: FontSize.ExtraSmall,
    fontWeight: '600',
    textAlignVertical: 'center',
    marginLeft: 7,
  },
  generalProductInfo: {
    paddingLeft: 20,
    marginTop: 5,
    width: '60%',
  },
  waitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  hourglassImage: {
    width: 13,
    height: 13,
    overflow: 'hidden',
  },
  notification: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: Colors.Cranberry,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageBackground: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: Colors.Finlandia,
    alignSelf: 'center',
    marginTop: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    overflow: 'hidden',
    marginLeft: 5,
    marginTop: 5,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: Colors.TimberGreen,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disagree: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    marginTop: -4,
  },
  disagreeButton: {
    backgroundColor: Colors.Cranberry,
  },
});
