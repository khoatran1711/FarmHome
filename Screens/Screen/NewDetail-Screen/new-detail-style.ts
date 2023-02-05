import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  imageBanner: {
    width: '100%',
    height: 300,
    flexDirection: 'row',
  },
  bigRoundBannerContainer: {
    marginTop: '-35%',
    marginLeft: '10%',
    width: 200,
    height: 200,
    borderRadius: 800,
    overflow: 'hidden',
  },
  bigRoundBanner: {
    transform: [{translateX: -50}, {translateY: 50}],
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  leftBanner: {
    width: '30%',
  },
  leafTwoIcon: {
    marginTop: 30,
    marginLeft: '55%',
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  leafOneIcon: {
    marginTop: 30,
    marginLeft: '15%',
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    opacity: 0.9,
  },
  leafOneIconRight: {
    marginTop: 0,
    marginLeft: '110%',
    width: 50,
    height: 50,
    transform: [{scaleX: -1}],
    opacity: 0.7,
  },
  leafTwoIconRight: {
    marginTop: 0,
    marginLeft: '150%',
    transform: [{scaleX: -1}],
    opacity: 0.5,
  },
  newTitle: {
    color: Colors.White,
    fontSize: FontSize.Large,
    fontWeight: 'bold',
    marginRight: '5%',
    marginTop: 20,
    width: '90%',
  },
  newName: {
    marginTop: 5,

    marginRight: '5%',
    color: '#BFBFBF',
    fontSize: FontSize.MediumSmall,
  },
  newDescriptionContainer: {
    marginTop: 5,
    marginLeft: '5%',
    marginRight: '5%',
  },
  newDescription: {
    color: Colors.DarkGreen,
    fontSize: FontSize.MediumSmall,
    marginBottom: 20,
  },
  newDate: {
    //color:Colors.DarkGreen,
    color: '#BFBFBF',
    fontSize: FontSize.SemiSmall,
  },
  headerBackground: {
    width: '103%',
    height: 200,
    paddingTop: 10,
    paddingLeft: '5%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  imageInContent: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
  imageNew: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
});
