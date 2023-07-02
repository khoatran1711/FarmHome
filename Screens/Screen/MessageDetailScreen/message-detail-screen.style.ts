import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TimberGreen,
  },
  inputContainer: {
    backgroundColor: '#495B4A',
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxHeight: 80,
  },
  input: {
    width: '80%',
    height: '100%',
    color: Colors.Solitaire,
  },
  sendMessageButton: {
    width: '12%',
    backgroundColor: Colors.Solitaire,
    height: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  chatMessageContainer: {
    marginVertical: 3,
  },
  messageDate: {
    color: Colors.Solitaire,
    fontSize: FontSize.Small,
    textAlign: 'center',
    marginVertical: 8,
  },
  userChatContainer: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginVertical: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: Colors.Finlandia,
    maxWidth: '50%',
    alignSelf: 'flex-end',
  },
  userChooseChat: {
    backgroundColor: Colors.GrayAsparagus,
  },
  userChatContent: {
    color: Colors.Solitaire,
    fontSize: FontSize.MediumSmall,
  },
  userChatDate: {
    color: Colors.Solitaire,
    fontSize: FontSize.SemiSmall,
    textAlign: 'right',
  },
  farmerChatContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.Solitaire,
    maxWidth: '50%',
    alignSelf: 'flex-start',
  },
  farmerChatContent: {
    color: Colors.TimberGreen,
    fontSize: FontSize.MediumSmall,
  },
  farmerChatDate: {
    color: Colors.TimberGreen,
    fontSize: FontSize.SemiSmall,
    textAlign: 'left',
  },
});
