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
import {SettingScreen} from '../Screen/Setting-Screen/setting-screen';
import {useTranslation} from 'react-i18next';
import {LoginScreen} from '../Screen/Login-Screen/login-screen';
//import {SignupScreen} from '../Screen/Signup-Screen/signup-screen';
import {ExploreScreen} from '../Screen/ExploreScreen/explore-screen';
import {NewsScreen} from '../Screen/NewsScreen/news-screen';
import {
  FadeInView,
  MessageScreen,
} from '../Screen/MessageScreen/message-screen';
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
} from '../constants/assets.constants';
import {styles} from './root-style';
import {NewDetailScreen} from '../Screen/NewDetail-Screen/new-detail-screen';
import {SearchScreen} from '../Screen/SearchScreen/search-screen';
import {ProductDetailScreen} from '../Screen/ProductDetailScreen/product-detail-screen';
import {StoreDetailScreen} from '../Screen/StoreDetailScreen/store-detail-screen';
import {WaitingScreen} from '../Screen/WaitingScreen/waiting-screen';
import {ProductWaitingDetail} from '../Screen/WaitingScreen/ProductScreen/product-screen';
import {HistoryScreen} from '../Screen/HistoryScreen/history-screen';
import {ProductHistoryDetail} from '../Screen/HistoryScreen/ProductScreen/product-screen';
import {UserProfileScreen} from '../Screen/UserProfileScreen/user-profile-screen';
import {ChangePasswordScreen} from '../Screen/ChangePasswordScreen/change-password-screen';
import {Colors} from '../constants/color.constants';
import {SignUpScreenComponent} from '../Screen/SignupScreen/signup-screen.component';
import {I18n} from '../translation';

const Tab = createBottomTabNavigator();
export const navigationRef = createNavigationContainerRef();

export const StackNavigator = ({navigation, route}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreenComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaitingScreen"
          component={WaitingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductHistoryScreen"
          component={ProductHistoryDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductWaitingScreen"
          component={ProductWaitingDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewDetailScreen"
          component={NewDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoreDetailScreen"
          component={StoreDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Language" component={SettingsLanguageScreen} />
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
        component={MessageScreen}
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
    </Tab.Navigator>
  );
};
