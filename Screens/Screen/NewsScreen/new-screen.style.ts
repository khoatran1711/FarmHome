import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';

const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  slide: {
    marginHorizontal: 0,
    width: '100%',
    backgroundColor: Colors.Finlandia,
    height: DEVICE.WIDTH,
  },
  verticalCardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  verticalTextCard: {
    width: '100%',
    backgroundColor: Colors.Finlandia,
    height: '25%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.MediumSmall,
    fontWeight: '600',
    color: Colors.Solitaire,
  },
  smallTitle: {
    textAlign: 'center',
    fontSize: FontSize.SemiSmall,
    color: Colors.Solitaire90,
  },
  smallIcon: {
    width: 15,
    height: 15,
    resizeMode: 'stretch',
    marginHorizontal: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  horizontalCard: {
    flexDirection: 'row',
    width: '80%',
    height: 90,
    backgroundColor: Colors.Finlandia,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  horizontalCardImage: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
  },
  horizontalCardContent: {
    width: '65%',
    height: '100%',
  },

  sliderItem: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.White,
    overflow: 'hidden',
    backgroundColor: Colors.DarkGreen,
  },
  sliderChosen: {
    width: (width * 65) / 100,
    height: (width * 90) / 100,
  },
  sliderNormal: {
    width: (width * 55) / 100,
    height: (width * 90) / 100,
  },

  container: {
    backgroundColor: Colors.TimberGreen,
    flex: 1,
  },
  backgroundImageContainer: {
    height: 190,
    width: '100%',
  },
  containerBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.BlackOpacity80,
    paddingTop: 20,
  },
  bigTitle: {
    color: Colors.White,
    fontSize: FontSize.MediumLarge,
    textAlign: 'center',
  },
  mediumTitle: {
    color: Colors.White,
    fontSize: FontSize.MediumSmall,
    width: '76%',
    textAlign: 'center',
    marginLeft: '12%',
  },
  bigGreenTitle: {
    color: Colors.Solitaire,
    fontSize: FontSize.MediumLarge,
    textAlign: 'center',
  },
  mediumGreenTitle: {
    width: '80%',
    marginLeft: '10%',
    color: Colors.Solitaire90,
    fontSize: FontSize.Small,
    textAlign: 'center',
  },

  horizontalText: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    width: '70%',
    color: Colors.White,
  },
});
