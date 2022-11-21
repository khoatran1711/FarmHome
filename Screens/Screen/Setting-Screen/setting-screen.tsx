import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './setting-style';
import {globalNavigate} from '../../utilities/navigator-utilities';

export const SettingScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>Thanh toán</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('WaitingScreen')}>
            <Text style={styles.settingText}>Danh sách chờ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('HistoryScreen')}>
            <Text style={styles.settingText}>Danh sách đặt thành công</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>{t('common:account')}</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('ChangePasswordScreen')}>
            <Text style={styles.settingText}>
              {t('common:account')} {t('common:and')} {t('common:security')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate('Language')}>
            <Text style={styles.settingText}>{t('common:language')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => globalNavigate('UserProfileScreen')}>
            <Text style={styles.settingText}>Thông tin cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
