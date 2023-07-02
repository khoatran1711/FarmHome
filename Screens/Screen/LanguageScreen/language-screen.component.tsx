import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {engIcon, vieIcon} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {I18n} from '../../translation';
import {resetNavigation} from '../../utilities/navigator-utilities';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {HeaderTitle} from '../ui/header-title';

export const LanguageScreen = () => {
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
    <>
      <View style={styles.container}>
        <GoBackButton />
        <HeaderTitle title={I18n.language.toUpperCase()} />
        <View style={styles.row}>
          <Text style={styles.title}>{I18n.languageSelector}</Text>
        </View>
        <View style={styles.chooseContainer}>
          {LANGUAGES.map(language => {
            const selectedLanguage = language.code === selectedLanguageCode;
            return (
              <TouchableOpacity
                key={language.code}
                style={
                  selectedLanguage
                    ? styles.buttonContainerSelected
                    : styles.buttonContainer
                }
                // disabled={selectedLanguage}
                onPress={() => {
                  setSelectedLanguageCode(language.code);
                  setLanguage(language.code);
                }}>
                <View style={styles.flatContainer}>
                  <Image source={language.flat} style={styles.flatIcon} />
                </View>

                <Text
                  style={[
                    selectedLanguage ? styles.selectedText : styles.text,
                  ]}>
                  {language.label}
                </Text>

                {selectedLanguage && (
                  <View style={styles.currentContainer}>
                    <Text style={styles.currentText}>CURRENT</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: Colors.TimberGreen,
    paddingHorizontal: '3%',
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
    color: Colors.Solitaire,
    fontSize: FontSize.MediumLarge,
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 40,
    width: 90,
    height: 180,

    borderRadius: 80,
    paddingTop: 20,
  },
  buttonContainerSelected: {
    marginTop: 40,
    width: 90,
    height: 180,
    backgroundColor: Colors.Solitaire,
    borderRadius: 80,
    paddingTop: 20,
  },
  text: {
    fontSize: FontSize.Normal,
    color: Colors.Solitaire,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  selectedText: {
    fontSize: FontSize.Normal,
    color: Colors.TimberGreen,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 10,
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
  currentContainer: {
    width: '80%',
    alignSelf: 'center',
    height: 36,
    backgroundColor: Colors.Finlandia,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },
  currentText: {
    fontSize: FontSize.SemiSmall,
    color: Colors.Solitaire,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 8,
  },
});
