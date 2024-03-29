import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {HomeScreen} from '../Screen/Home-Screen/HomeScreen';
import {SettingsLanguageScreen} from '../Screen/Home-Screen/SettingLanguageScreen';
import {SettingScreen} from '../Screen/Setting-Screen/setting-screen.component';
import {useTranslation} from 'react-i18next';
import {LoginScreen} from '../Screen/Login-Screen/login-screen';
//import {SignupScreen} from '../Screen/Signup-Screen/signup-screen';
import {ExploreScreen} from '../Screen/ExploreScreen/explore-screen.component';
import {NewsScreen} from '../Screen/NewsScreen/news-screen.component';
import {
  FadeInView,
  MessageDetailScreen,
  MessageScreen,
} from '../Screen/MessageDetailScreen/message-detail-screen.component';
import {
  backButtonIcon,
  exploreTabIcon,
  exploreTabIconSelected,
  homeTabIcon,
  homeTabIconSelected,
  messageTabIcon,
  messageTabIconSelected,
  meTabIcon,
  meTabIconSelected,
  newTabIcon,
  newTabIconSelected,
  notifyIcon,
  notifyIconSelected,
} from '../constants/assets.constants';
import {styles} from './root-style';
import {NewDetailScreen} from '../Screen/NewDetail-Screen/new-detail-screen.component';
import {SearchScreen} from '../Screen/SearchScreen/search-screen.component';
import {ProductDetailScreen} from '../Screen/ProductDetailScreen/product-detail-screen.component';
import {StoreDetailScreen} from '../Screen/StoreDetailScreen/store-detail-screen.component';
import {WaitingScreen} from '../Screen/WaitingScreen/waiting-screen.component';
import {ProductWaitingDetail} from '../Screen/WaitingScreen/ProductScreen/product-screen.component';
import {HistoryScreen} from '../Screen/HistoryScreen/history-screen.component';
import {ProductHistoryDetail} from '../Screen/HistoryScreen/ProductScreen/product-screen.component';
import {UserProfileScreen} from '../Screen/UserProfileScreen/user-profile-screen.component';
import {ChangePasswordScreen} from '../Screen/ChangePasswordScreen/change-password-screen.component';
import {Colors} from '../constants/color.constants';
import {SignUpScreenComponent} from '../Screen/SignupScreen/signup-screen.component';
import {I18n} from '../translation';
import {ScreenName} from '../constants/screen-name.constant';
import {CategoryScreen} from '../Screen/CategoryScreen';
import {MessageList} from '../Screen/MessageList/message-list.component';
import {useDispatch} from 'react-redux';
import {checkToken} from '../state/authentication/authentication.thunk';
import {NotificationScreen} from '../Screen/NotificationScreen/notification-screen.component';
import {LanguageScreen} from '../Screen/LanguageScreen/language-screen.component';
import {DeliveringScreen} from '../Screen/DeliveringScreen/delivering-screen.component';
import {ProductDeliveryDetail} from '../Screen/DeliveringScreen/ProductScreen/product-screen.component';

const Tab = createBottomTabNavigator();
export const navigationRef = createNavigationContainerRef();

export const StackNavigator = ({navigation, route}) => {
  // Check Token
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkToken());
  // }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={ScreenName.LoginScreen}>
        <Stack.Screen
          name={ScreenName.LoginScreen}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={ScreenName.SignUpScreen}
          component={SignUpScreenComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.SearchScreen}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.WaitingScreen}
          component={WaitingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.HistoryScreen}
          component={HistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.ProductHistoryScreen}
          component={ProductHistoryDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.ProductWaitingScreen}
          component={ProductWaitingDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.ChangePasswordScreen}
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.UserProfileScreen}
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.NewDetailScreen}
          component={NewDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.ProductDetailScreen}
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.StoreDetailScreen}
          component={StoreDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.CategoryScreen}
          component={CategoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.LanguageScreen}
          component={LanguageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.MessageDetailScreen}
          component={MessageDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.DeliveryScreen}
          component={DeliveringScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.ProductDeliveryScreen}
          component={ProductDeliveryDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.DarkGreen,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: I18n.home,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={focused ? homeTabIconSelected : homeTabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: I18n.explore,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={focused ? exploreTabIconSelected : exploreTabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Me"
        component={SettingScreen}
        options={{
          tabBarLabel: I18n.me,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={focused ? meTabIconSelected : meTabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageList}
        options={{
          tabBarLabel: I18n.message,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={focused ? messageTabIconSelected : messageTabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: I18n.news,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.tabIcon}
                  source={focused ? newTabIconSelected : newTabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: I18n.notification,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  style={styles.notificationIcon}
                  source={focused ? notifyIconSelected : notifyIcon}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
