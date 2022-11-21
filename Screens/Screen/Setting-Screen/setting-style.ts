import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkGreen,
  },
  nameOfGroup: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: FontSize.Normal,
    color: Colors.White,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  settingButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 15,
    paddingVertical: 8,
    color: 'black',
  },
  groupContainer: {
    marginTop: 10,
  },
  settingContainer: {},
});
