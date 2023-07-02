import {firebase} from '@react-native-firebase/database';
import React, {useState} from 'react';
import {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {getImageFarmer} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {HeaderTitle} from '../ui/header-title';
import {styles} from './messgae-list.style';

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
        const val: any[] = snapshot?.val() || [];

        const items: any[] = [];
        snapshot?.forEach((childSnapshot: any) => {
          try {
            if (
              childSnapshot &&
              childSnapshot?.val() &&
              Object.keys(childSnapshot?.val())[0]
            ) {
              const sortList = [...Object.values(childSnapshot?.val())]?.sort(
                (a: any, b: any) => b?.createdAt - a?.createdAt,
              );

              items.push(sortList[0]);
            }
          } catch (error) {}
        });
        setChatList(items);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
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
        <View style={styles.chatBoxContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={getImageFarmer(message?.farmer?.image)}
              style={styles.image}
            />
          </View>
          <View style={styles.userChatContainer}>
            <Text style={styles.userChat}>{message?.farmer?.name}</Text>
            <Text numberOfLines={2} style={styles.userChatContent}>
              {message?.text}
            </Text>
          </View>
        </View>

        <View style={styles.line} />
      </TouchableOpacity>
    </>
  );
};
