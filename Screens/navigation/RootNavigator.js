import React, {useLayoutEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  StackActions,
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
import {SignupScreen} from '../Screen/Signup-Screen/signup-screen';
import {ExploreScreen} from '../Screen/ExploreScreen/explore-screen';
import {NewsScreen} from '../Screen/NewsScreen/news-screen';
import {FadeInView} from '../Screen/MessageScreen/message-screen';
import {
  backButtonIcon,
  exploreTabIcon,
  homeTabIcon,
  messageTabIcon,
  meTabIcon,
  newTabIcon,
} from '../constants/assets.constants';
import {styles} from './root-style';
import {NewDetailScreen} from '../Screen/NewDetail-Screen/new-detail-screen';
import {SearchScreen} from '../Screen/SearchScreen/search-screen';
import {ProductDetailScreen} from '../Screen/ProductDetailScreen/product-detail-screen';

const Tab = createBottomTabNavigator();

export const StackNavigator = ({navigation, route}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Language" component={SettingsLanguageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const TabNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('common:home'),
          headerShown: false,
          tabBarIcon: () => {
            return (
              <View>
                <Image style={styles.tabIcon} source={homeTabIcon} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: t('common:explore'),
          headerShown: false,
          tabBarIcon: () => {
            return (
              <View>
                <Image style={styles.tabIcon} source={exploreTabIcon} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Me"
        component={SettingScreen}
        options={{
          tabBarLabel: t('common:me'),
          tabBarIcon: () => {
            return (
              <View>
                <Image style={styles.tabIcon} source={meTabIcon} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={ProductDetailScreen}
        options={{
          tabBarLabel: t('common:message'),
          tabBarIcon: () => {
            return (
              <View>
                <Image style={styles.tabIcon} source={messageTabIcon} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: t('common:news'),
          headerShown: false,
          tabBarIcon: () => {
            return (
              <View>
                <Image style={styles.tabIcon} source={newTabIcon} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
