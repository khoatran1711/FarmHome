/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import 'intl-pluralrules';
import {SignupScreen} from './Screens/Screen/Signup-Screen/signup-screen';

import {StackNavigator} from './Screens/navigation/RootNavigator';
import './Screens/constants/IMLocalize';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {RootPersistor, RootStore} from './Screens/domain/store';
import {Provider} from 'react-redux';
import {WithSplashScreen} from './Screens/Screen/SplashScreen/splash-screen.component';
import {ProductCard} from './Screens/Screen/ui/product-card/product-card.component';
import {ProductCardHorizontal} from './Screens/Screen/ui/product-card-horizontal/product-card-horizontal.component';
import {SignUpScreenComponent} from './Screens/Screen/SignupScreen/signup-screen.component';
import PushController from './Screens/services/notification.service';
import PushNotification from 'react-native-push-notification';
import {GiftedChat} from 'react-native-gifted-chat';
import {addDoc, collection, getFirestore} from '@firebase/firestore';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import {useMemo} from 'react';

async function initialize() {}

const testUserId = 1;
const testStoreId = 5;

const App: () => Node = () => {
  const store = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    initialize().then(context => {
      store.current = RootStore;
      console.log('hello');
      setIsAppReady(true);
    });
  }, []);
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: ['Hello developer'],
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
        },
      },
      {
        _id: 3,
        text: ['Hello developer'],
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'React Native',
        },
      },
      {
        _id: 1,
        text: ['Hello developer'],
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    const ref = firebase
      .app()
      .database(
        'https://farmhomenotification-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/messages/${testUserId}-${testStoreId}`)
      .push();

    ref.set({...messages[0], createdAt: messages[0]?.createdAt?.getTime()});
  }, []);

  useMemo(() => {
    firebase
      .app()
      .database(
        'https://farmhomenotification-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/messages/${testUserId}-${testStoreId}`)
      .on('value', snapshot => {
        const val = snapshot.val() || [];
        let list = [];
        Object.keys(val)?.map(one => {
          list.push(val[one]);
        });
        console.log(JSON.stringify(list));
        const test = [...list]?.sort((a, b) =>
          a?.createdAt < b?.createdAt ? 1 : -1,
        );
        setData(test);
      });
  }, []);

  const onSendTest = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <>
      {/* <WithSplashScreen isAppReady={isAppReady}>
      <Provider store={store.current}>
        <PersistGate persistor={RootPersistor}>
          <StackNavigator />

        </PersistGate>
      </Provider>
      <PushController />
    </WithSplashScreen> */}
      <GiftedChat
        textInputProps={{color: 'black'}}
        messages={data}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
          name: 'Khoa Trần',
        }}
      />
    </>
  );
};

export default App;
