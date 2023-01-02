import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useTranslation} from 'react-i18next';

import {engIcon} from '../../constants/assets.constants';
import {vieIcon} from '../../constants/assets.constants';
import {I18n} from '../../translation';
import {resetNavigation} from '../../utilities/navigator-utilities';

const Selector = () => {
  const {t, i18n} = useTranslation();
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    I18n._language,
  );

  useEffect(() => {
    selectedLanguageCode && I18n.setLanguage(selectedLanguageCode);
  }, [selectedLanguageCode]);

  const LANGUAGES = [
    {code: 'en', label: I18n.english, flat: engIcon},
    {code: 'vi', label: I18n.vietnam, flat: vieIcon},
  ];
  const setLanguage = code => {
    I18n.setLanguage(code);
    resetNavigation('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{t('common:languageSelector')}</Text>
      </View>
      <View style={styles.chooseContainer}>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              // disabled={selectedLanguage}
              onPress={() => {
                setSelectedLanguageCode(language.code);
                setLanguage(language.code);
              }}>
              <View style={styles.flatContainer}>
                <Image
                  source={language.flat}
                  style={[
                    selectedLanguage
                      ? styles.selectedFlatIcon
                      : styles.flatIcon,
                  ]}
                />
              </View>

              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {language.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chooseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 40,
  },
  text: {
    fontSize: 18,
    color: '#000',
    textAlignVertical: 'center',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    textAlignVertical: 'center',
  },
  flatContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flatIcon: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 400,
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  selectedFlatIcon: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 400,
    width: 70,
    height: 70,
    resizeMode: 'stretch',
  },
});

export default Selector;
