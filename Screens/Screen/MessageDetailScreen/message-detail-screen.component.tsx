import {addDoc, collection} from '@firebase/firestore';
import {firebase} from '@react-native-firebase/database';
import React, {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {backgroundComing} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import database from '@react-native-firebase/database';
import axios from 'axios';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {useRootSelector} from '../../domain/hooks';
import {UserService} from '../../services/user.service';
import {User} from '../Models/user.model';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './message-detail-screen.style';
import {I18n} from '../../translation';
import {convertDateToTime} from '../../utilities/help-utilities';

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

export const MessageDetailScreen = ({route}: {route: any}) => {
  const {farmerId} = route?.params;
  const userId = useRootSelector(AuthenticationSelectors.idSelector);
  const [data, setData] = useState<any[]>([]);
  const [chat, setChat] = useState('');
  const scrollViewRef = useRef<ScrollView>();
  const [farmerInfo, setFarmerInfo] = useState<User>();
  const userService = new UserService();
  const [waiting, setWaiting] = useState(false);

  const onSend = useCallback((messages = '', farmer: User) => {
    if (farmer) {
      const ref = firebase
        .app()
        .database('https://farmhomemessage-default-rtdb.firebaseio.com/')
        .ref(`/messages/${userId}/${farmerId}`)
        .push();

      ref.set({
        text: messages,
        createdAt: new Date().getTime(),
        sentUserId: userId,
        user: {
          id: userId,
          name: 'Test',
          image:
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        },
        farmer: {
          id: farmer?.id,
          name: farmer?.firstName + ' ' + farmer?.lastName,
          image: farmer?.avatar,
        },
      });

      const refFarmer = firebase
        .app()
        .database('https://farmhomemessage-default-rtdb.firebaseio.com/')
        .ref(`/messages/${farmerId}/${userId}`)
        .push();

      refFarmer.set({
        text: messages,
        createdAt: new Date().getTime(),
        sentUserId: userId,
        user: {
          id: userId,
          name: 'Test',
          image:
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        },
        farmer: {
          id: farmer?.id,
          name: farmer?.firstName + ' ' + farmer?.lastName,
          image: farmer?.avatar,
        },
      });

      setChat('');
    }
  }, []);

  const getData = async () => {
    setWaiting(true);
    const response = await userService.getUserById(farmerId);
    const data = response?.data;

    setFarmerInfo(data);
    setWaiting(false);
  };

  useMemo(() => {
    getData();
    firebase
      .app()
      .database('https://farmhomemessage-default-rtdb.firebaseio.com/')
      .ref(`/messages/${userId}/${farmerId}`)
      .on('value', snapshot => {
        const val: any[] = snapshot?.val() || [];
        let list: any[] = Object.values(val);

        const test = [...list]?.sort((a: any, b: any) =>
          a?.createdAt < b?.createdAt ? -1 : 1,
        );

        test !== [] && setData(test);
      });
  }, [farmerId, userId]);

  //useEffect(() => {}, [farmerId]);

  return (
    <>
      <View style={styles.container}>
        {waiting ? (
          <WaitingComponent />
        ) : (
          <>
            {farmerInfo && <UserInfo user={farmerInfo} />}
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef?.current?.scrollToEnd({animated: true})
              }>
              {userId && <ChatBox data={data} userId={userId} />}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                cursorColor={Colors.Solitaire}
                multiline={true}
                value={chat}
                onChangeText={e => setChat(e)}
              />
              <TouchableOpacity
                style={styles.sendMessageButton}
                onPress={() => {
                  farmerInfo && onSend(chat, farmerInfo);
                }}>
                <Text
                  style={{color: Colors.TimberGreen, fontSize: FontSize.Small}}>
                  {I18n.send}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const ChatBox = ({data, userId}: {data: ChatMessage[]; userId: number}) => {
  let dateList: string[] = [];
  data?.map(mes => {
    const date = new Date(mes.createdAt)?.toDateString();
    !dateList?.includes(date) && dateList.push(date);
  });

  return (
    <>
      <View style={styles.chatMessageContainer}>
        {dateList?.map(date => (
          <>
            <Text style={styles.messageDate}>{date}</Text>
            {data
              ?.filter(
                mess => new Date(mess.createdAt)?.toDateString() === date,
              )
              ?.map(mess =>
                mess?.sentUserId === userId ? (
                  <UserChat message={mess} />
                ) : (
                  <FarmerChat message={mess} />
                ),
              )}
          </>
        ))}
      </View>
    </>
  );
};

const UserChat = ({message}: {message: ChatMessage}) => {
  const [showTime, setShowTime] = useState(false);

  return (
    <TouchableOpacity
      style={styles.userChatContainer}
      onPress={() => setShowTime(!showTime)}>
      <Text style={styles.userChatContent}>{message?.text}</Text>
      {showTime && (
        <Text style={styles.userChatDate}>
          {convertDateToTime(new Date(message?.createdAt))}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const FarmerChat = ({message}: {message: ChatMessage}) => {
  return (
    <TouchableOpacity style={styles.farmerChatContainer}>
      <Text style={styles.farmerChatContent}>{message?.text}</Text>
      <Text style={styles.farmerChatDate}>
        {convertDateToTime(new Date(message?.createdAt))}
      </Text>
    </TouchableOpacity>
  );
};

const UserInfo = ({user}: {user: User}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '3%',
          backgroundColor: Colors.Finlandia,
          paddingVertical: 10,
        }}>
        <GoBackButton />
        <Text
          style={{
            color: Colors.Solitaire,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: '600',
            fontSize: FontSize.Normal,
            width: '80%',
          }}>
          {user?.firstName + ' ' + user?.lastName}
        </Text>
      </View>
    </>
  );
};
