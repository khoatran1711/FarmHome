import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './setting-style';
import {
  globalNavigate,
  resetNavigation,
} from '../../utilities/navigator-utilities';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {I18n} from '../../translation';

export const SettingScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>Thanh toán</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('WaitingScreen')}>
            <Text style={styles.settingText}>{I18n.paymentWaitingList}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('HistoryScreen')}>
            <Text style={styles.settingText}>{I18n.successfulOrderList}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>{I18n.account}</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('ChangePasswordScreen')}>
            <Text style={styles.settingText}>
              {I18n.account} {I18n.and} {I18n.security}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate('Language')}>
            <Text style={styles.settingText}>{I18n.language}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('UserProfileScreen')}>
            <Text style={styles.settingText}>{I18n.personalInformation}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => {
              new AuthenticationService().LogOut();
              resetNavigation('LoginScreen');
            }}>
            <Text style={styles.settingText}>{I18n.logOut}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
