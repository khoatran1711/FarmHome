import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {banner1} from '../../constants/assets.constants';
import {cubeOne1} from '../../constants/assets.constants';
import {cubeTwo} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {logowithouttext} from '../../constants/assets.constants';
import {orangeIcon} from '../../constants/assets.constants';
import {new1} from '../../constants/assets.constants';

import Draggable from 'react-native-draggable';
import {styles} from './home-screen.style';
import {useRootSelector} from '../../domain/hooks';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';

const HomeBanner = props => {
  return (
    <ImageBackground source={props.bannerImage} style={styles.bannerImage}>
      <Image source={cubeOne1} style={styles.cubeOne} />
      <Image source={cubeTwo} style={styles.cubeTwo} />
      <View style={{marginTop: 80}}>
        <View style={styles.blockOne} />
        <View style={styles.blockTwo} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.blockThree} />
        <View style={styles.blockFour} />
        <View style={styles.blockFive} />
      </View>
    </ImageBackground>
  );
};

export const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <HomeBanner bannerImage={banner1} />
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganTitle}>FarmHome</Text>
          <Text style={{color: Colors.White, fontSize: FontSize.MediumLarge}}>
            {t('common:farmhomeslogan')}
          </Text>
          <View style={styles.lineWithLogo}>
            <View style={styles.oneLine} />
            <Image source={logowithouttext} style={styles.logo} />
            <View style={styles.oneLine} />
          </View>
        </View>

        {/** season fruits */}
        <View style={styles.seasonFruitContainer}>
          <Text style={styles.seasonFruitTitle}>
            {t('common:seasonfruits')}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.fruitCard]}>
              <Image source={orangeIcon} style={styles.fruitLogo} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.fruitCard]} />

            <TouchableOpacity style={[styles.fruitCard]} />

            <TouchableOpacity style={[styles.fruitCard]} />

            <TouchableOpacity style={[styles.fruitCard]} />
          </ScrollView>
        </View>
        {/** Line */}
        <View style={styles.fruitLogo} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
