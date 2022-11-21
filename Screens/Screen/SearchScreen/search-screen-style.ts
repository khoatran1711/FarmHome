import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkGreen,
  },
  searchContainer: {},
  resultContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  resultNumber: {
    textAlign: 'center',
    fontSize: FontSize.MediumSmall,
    marginBottom: 10,
  },
  allResultContainer: {
    width: '90%',
    //backgroundColor:'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: '3%',
  },
  productCardContainer: {
    width: '48%',
    backgroundColor: Colors.Black,
    height: 200,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  borderCard: {
    width: '28%',
    height: 40,
    backgroundColor: Colors.DarkFuelGreen,
    borderBottomLeftRadius: 100,
    zIndex: 20,
    paddingLeft: '8%',
  },
  productContainer: {
    width: '100%',
    marginTop: -35,
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: 120,
  },
  productName: {
    marginTop: 3,
    fontSize: FontSize.MediumSmall,
    fontWeight: '600',
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: '5%',
  },
  productFarmName: {
    fontSize: FontSize.SemiSmall,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: '5%',
    marginTop: 2,
  },
  productLocation: {
    fontSize: FontSize.SemiSmall,
    marginTop: 1,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: '5%',
  },
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
  typeContainer: {
    flexBasis: '28%',
    marginHorizontal: 5,
  },
});
