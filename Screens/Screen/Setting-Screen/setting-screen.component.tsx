import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './setting-screen.style';
import {
  globalNavigate,
  resetNavigation,
} from '../../utilities/navigator-utilities';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {I18n} from '../../translation';
import {LongHorizontalButtonIcon} from '../ui/long-horizontal-button-icon';
import {
  billIcon,
  exitIcon,
  hourglassIcon,
  languageIcon,
  securityIcon,
  userIcon,
} from '../../constants/assets.constants';
import {ScreenName} from '../../constants/screen-name.constant';

export const SettingScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>{I18n.payment}</Text>
        <View style={styles.settingContainer}>
          <LongHorizontalButtonIcon
            icon={hourglassIcon}
            title={I18n.paymentWaitingList}
            onPress={() => globalNavigate(ScreenName.WaitingScreen)}
          />
          <LongHorizontalButtonIcon
            icon={billIcon}
            title={I18n.successfulOrderList}
            onPress={() => globalNavigate(ScreenName.HistoryScreen)}
          />
        </View>
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>{I18n.account}</Text>
        <View style={styles.settingContainer}>
          <LongHorizontalButtonIcon
            icon={securityIcon}
            title={I18n.account + I18n.and + I18n.security}
            onPress={() => globalNavigate(ScreenName.ChangePasswordScreen)}
          />
          <LongHorizontalButtonIcon
            icon={languageIcon}
            title={I18n.language}
            onPress={() => globalNavigate(ScreenName.LanguageScreen)}
          />
          <LongHorizontalButtonIcon
            icon={userIcon}
            title={I18n.personalInformation}
            onPress={() => globalNavigate(ScreenName.UserProfileScreen)}
          />
          <LongHorizontalButtonIcon
            icon={exitIcon}
            title={I18n.logOut}
            onPress={() => {
              new AuthenticationService().LogOut();
              resetNavigation('LoginScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
};
