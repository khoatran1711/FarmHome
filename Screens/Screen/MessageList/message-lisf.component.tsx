import {firebase} from '@react-native-firebase/database';
import React, {useState} from 'react';
import {useMemo} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {HeaderTitle} from '../ui/header-title';

interface ChatMessage {
  _id: number;
  text: string[];
  createdAt: number;
  sentUserId: number;
  user: {
    id: number;
    name: string;
    image: string;
  };
  farmer: {
    id: number;
    name: string;
    image;
  };
}

export const MessageList = () => {
  const userId = useRootSelector(AuthenticationSelectors.idSelector);
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  useMemo(() => {
    firebase
      .app()
      .database('https://farmhomemessage-default-rtdb.firebaseio.com/')
      .ref(`/messages/${userId}`)
      .on('value', snapshot => {
        const val: any[] = snapshot.val() || [];
        let list: any[] = Object.values(val);

        const items = [];
        snapshot?.forEach(childSnapshot => {
          items.push(
            childSnapshot?.val()[Object.keys(childSnapshot?.val())[0]],
          );
        });
        setChatList(items);
      });
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.TimberGreen,
          paddingHorizontal: '3%',
          paddingTop: 20,
        }}>
        <HeaderTitle title={I18n.chat.toUpperCase()} />
        {chatList?.map(e => (
          <ChatBox message={e} />
        ))}
      </View>
    </>
  );
};

const ChatBox = ({message}: {message: ChatMessage}) => {
  return (
    <>
      <TouchableOpacity
        style={{marginVertical: 6}}
        onPress={() =>
          globalNavigate(ScreenName.MessageDetailScreen, {
            farmerId: message?.farmer?.id,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View
            style={{
              width: DEVICE.WIDTH * 0.16,
              height: DEVICE.WIDTH * 0.16,
              borderRadius: 60,
              overflow: 'hidden',
            }}>
            <Image
              source={message?.farmer?.image}
              style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
            />
          </View>
          <View
            style={{
              width: '84%',
              paddingHorizontal: '5%',
            }}>
            <Text style={{color: Colors.Solitaire, fontSize: FontSize.Normal}}>
              {message?.farmer?.name}
            </Text>
            <Text
              numberOfLines={2}
              style={{color: Colors.Solitaire90, fontSize: FontSize.Small}}>
              {message?.text}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '74%',
            alignSelf: 'flex-end',
            height: 1,
            marginTop: 4,
            backgroundColor: Colors.Solitaire90,
          }}
        />
      </TouchableOpacity>
    </>
  );
};
