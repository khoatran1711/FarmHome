import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TimberGreen,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  closeText: {
    color: Colors.Solitaire,
    fontSize: FontSize.MediumSmall,
  },
  contentContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '800',
    color: Colors.Solitaire,
    fontSize: FontSize.MediumSmall,
    marginBottom: 10,
  },
  item: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.Finlandia,
    marginVertical: 5,
  },
  itemText: {
    color: Colors.Solitaire,
    fontSize: FontSize.MediumSmall,
  },
});
