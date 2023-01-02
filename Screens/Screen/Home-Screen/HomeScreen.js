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
import {
  autumnIcon,
  banner1,
  popularIcon,
  springIcon,
  summerIcon,
  winterIcon,
} from '../../constants/assets.constants';
import {cubeOne1} from '../../constants/assets.constants';
import {cubeTwo} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {logowithouttext} from '../../constants/assets.constants';
import {styles} from './home-screen.style';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {SEASON_ENUM} from '../Models/product.model';
import {I18n} from '../../translation';

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <HomeBanner bannerImage={banner1} />
        <View style={styles.sloganContainer}>
          <Text style={styles.sloganTitle}>FarmHome</Text>
          <Text style={{color: Colors.White, fontSize: FontSize.MediumLarge}}>
            {I18n.farmhomeslogan}
          </Text>
          <View style={styles.lineWithLogo}>
            <View style={styles.oneLine} />
            <Image source={logowithouttext} style={styles.logo} />
            <View style={styles.oneLine} />
          </View>
        </View>

        {/** season fruits */}
        <View style={styles.seasonFruitContainer}>
          <Text style={styles.seasonFruitTitle}>{I18n.seasonfruits}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[styles.fruitCard]}
              onPress={() =>
                globalNavigate('SearchScreen', {
                  popular: true,
                })
              }>
              <Image source={popularIcon} style={styles.fruitLogo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fruitCard]}
              onPress={() =>
                globalNavigate('SearchScreen', {
                  seasonList: SEASON_ENUM.Spring,
                })
              }>
              <Image source={springIcon} style={styles.fruitLogo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fruitCard]}
              onPress={() =>
                globalNavigate('SearchScreen', {
                  seasonList: SEASON_ENUM.Summer,
                })
              }>
              <Image source={summerIcon} style={styles.fruitLogo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fruitCard]}
              onPress={() =>
                globalNavigate('SearchScreen', {
                  seasonList: SEASON_ENUM.Autumn,
                })
              }>
              <Image source={autumnIcon} style={styles.fruitLogo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fruitCard]}
              onPress={() =>
                globalNavigate('SearchScreen', {
                  seasonList: SEASON_ENUM.Winter,
                })
              }>
              <Image source={winterIcon} style={styles.fruitLogo} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/** Line */}
        <View style={styles.fruitLogo} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
