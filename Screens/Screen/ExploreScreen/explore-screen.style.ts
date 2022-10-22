import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  filterTitle: {
    color: Colors.White,
    fontSize: FontSize.Large,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginRight: '40%',
  },
  filterContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: Colors.DarkGreen,
    position: 'absolute',
    zIndex: 10,
  },
  filterHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backIcon: {
    marginTop: 10,
    marginLeft: '5%',
    height: 25,
    width: 25,
    zIndex: 500,
  },
  sortContainer: {
    flex: 1,
    backgroundColor: Colors.YellowGreen,
    marginTop: 30,
    borderTopLeftRadius: 40,
  },
  sortByTitle: {
    fontSize: FontSize.MediumLarge,
    color: Colors.White,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sortContentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sortTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeContainer: {
    flexBasis: '28%',
    marginHorizontal: 5,
  },
  typeName: {
    fontSize: FontSize.Small,
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.White,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  typeNameSelected: {
    backgroundColor: Colors.DarkGreen,
    borderRadius: 6,
  },
  line: {
    marginTop: 20,
    backgroundColor: Colors.White,
    height: 1,
  },
  bannerBackground: {
    height: 250,
  },
  exploreHeaderContainer: {
    paddingTop: 10,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: '70%',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    borderRadius: 12,
  },
  searchInput: {
    width: '80%',
    fontSize: FontSize.MediumSmall,
  },
  icon: {
    height: 25,
    width: 25,
  },
  numberTypeChosen: {
    width: '40%',
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.FilterGreen,
    fontSize: FontSize.ExtraSmall,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryContainer: {
    marginHorizontal: 10,
  },
  categoryProductContainer: {
    backgroundColor: Colors.LightYellowGreen,
    width: '100%',
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  productContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'blue',
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  productBackground: {
    width: '100%',
    height: '100%',
  },
  backgroundBlack: {
    backgroundColor: Colors.BlackOpacity80,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  productName: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FontSize.Normal,
    color: Colors.White,
  },
  chooseCategoryContainer: {
    width: '100%',
    height: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  chooseCategory: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 20,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.LightYellowGreen,
    borderLeftColor: 'transparent',
  },
});
