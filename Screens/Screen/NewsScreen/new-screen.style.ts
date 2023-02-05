import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  slide: {
    marginHorizontal: 20,
  },
  sliderItem: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.White,
    overflow: 'hidden',
    backgroundColor: Colors.DarkGreen,
  },
  sliderChosen: {
    width: (width * 48) / 100,
    height: (width * 90) / 100,
  },
  sliderNormal: {
    //   marginTop: (width * 4) / 100,
    width: (width * 40) / 100,
    height: (width * 90) / 100,
  },
  verticalCardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 3,
  },
  verticalTextCard: {
    width: '100%',
    backgroundColor: '#00000090',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.Small,
    color: Colors.White,
  },
  container: {
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
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumLarge,
    textAlign: 'center',
  },
  mediumGreenTitle: {
    width: '80%',
    marginLeft: '10%',
    color: Colors.DarkGreen,
    fontSize: FontSize.Small,
    textAlign: 'center',
  },
  horizontalCard: {
    marginLeft: '10%',
    width: '80%',
    height: 80,
    overflow: 'hidden',
  },
  horizontalText: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    width: '70%',
    color: Colors.White,
  },
});
