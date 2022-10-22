import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

export const SettingScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Text style={styles.nameOfGroup}>{t('common:account')}</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>
              {t('common:account')} {t('common:and')} {t('common:security')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate('Language')}>
            <Text style={styles.settingText}>{t('common:language')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  nameOfGroup: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 14,
    marginBottom: 4,
  },
  settingButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 15,
    paddingVertical: 8,
    color: 'black',
  },
});
