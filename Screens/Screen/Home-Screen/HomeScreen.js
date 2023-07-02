import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Button,
  useWindowDimensions,
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
import RenderHTML from 'react-native-render-html';

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

const source = {
  html: `
  <h2>Welcome to My Website</h2>

  <p>This is a sample page demonstrating the use of HTML content within WordPress.</p>
  
 
  <h3>Watch this YouTube Video</h3>
  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/triY1jfyDzU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  
  <h3>Check out this Table</h3>
  
  <table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr>
      <td>Data 4</td>
      <td>Data 5</td>
      <td>Data 6</td>
    </tr>
  </table>
  
  <p>Feel free to <a href="https://www.example.com">visit my website</a> for more information.</p>`,
};

export const HomeScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {/* <RenderHTML contentWidth={width} source={source} /> */}
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
