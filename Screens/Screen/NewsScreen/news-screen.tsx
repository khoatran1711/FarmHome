import {types} from '@babel/core';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import Carousel from 'react-native-snap-carousel';
import {
  latestNew1,
  news1,
  newsBackground,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {globalNavigate} from '../../utilities/navigator-utilities';

const width = Dimensions.get('window').width;

export const NewsScreen = () => {
  const scrollView = useRef();
  const autoCurrentRound = current => {
    scrollView.current?.scrollTo({
      x: ((width * 50) / 100) * current,
      animated: true,
    });
  };

  const styles = StyleSheet.create({
    slide: {
      marginHorizontal: 20,
    },
    sliderItem: {
      borderRadius: 20,
      borderWidth: 3,
      borderColor: Colors.White,
      overflow: 'hidden',
      backgroundColor: Colors.DarkGreen,
    },
    sliderChosen: {
      width: (width * 48) / 100,
      height: (width * 90) / 100,
    },
    sliderNormal: {
      //   marginTop: (width * 4) / 100,
      //   width: (width * 40) / 100,
      height: (width * 90) / 100,
    },
  });
  const sliderItem = [
    {
      index: 0,
      image: news1,
    },
    {
      index: 1,
      image: news1,
    },
    {
      index: 2,
      image: news1,
    },
    {
      index: 3,
      image: news1,
    },
    {
      index: 4,
      image: news1,
    },
    {
      index: 5,
      image: news1,
    },
  ];

  const [silderChosing, setSliderChosing] = useState(0);

  const Choose = index => {
    autoCurrentRound(index);
    setSliderChosing(index);
    globalNavigate('NewDetailScreen');
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => Choose(item.index)}
          style={[styles.sliderItem, styles.sliderNormal]}>
          <ImageBackground
            resizeMode="stretch"
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
            }}
            source={news1}>
            <Text style={{textAlign: 'center'}}>Hello</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <ImageBackground
        style={{
          height: 190,
          width: '100%',
          backgroundColor: 'blue',
        }}
        source={newsBackground}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Colors.BlackOpacity80,
            paddingTop: 20,
          }}>
          <Text
            style={{
              color: Colors.White,
              fontSize: FontSize.MediumLarge,
              textAlign: 'center',
            }}>
            3 BIG THINGS TODAY
          </Text>
          <Text
            style={{
              color: Colors.White,
              fontSize: FontSize.MediumSmall,
              width: '76%',
              textAlign: 'center',
              marginLeft: '12%',
            }}>
            Soybeans, gains drop overnight, export sales lower across the broad{' '}
          </Text>
        </View>
      </ImageBackground>

      <View style={{marginTop: -70}}>
        <Carousel
          data={sliderItem}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={(width * 45) / 100 + 40}
        />
      </View>

      <View style={{marginTop: 30}}>
        <Text
          style={{
            color: Colors.DarkGreen,
            fontSize: FontSize.Large,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          LATEST NEWS
        </Text>
        <Text
          style={{
            width: '80%',
            marginLeft: '10%',
            color: Colors.DarkGreen,
            fontSize: FontSize.Small,
            textAlign: 'center',
          }}>
          Find the latest ag news, including updates on farm policy, business,
          machinery, and technology.
        </Text>

        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{
              marginLeft: '10%',
              width: '80%',
              height: 80,

              overflow: 'hidden',
            }}>
            <ImageBackground
              source={latestNew1}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'stretch',
              }}>
              <LinearGradient
                colors={[Colors.DarkGreen, Colors.DarkFuelGreen80]}
                start={{x: 0.3, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    paddingLeft: 10,
                    textAlignVertical: 'center',
                    width: '70%',
                    color: Colors.White,
                  }}>
                  Hello 1fasdadbcah dbasuybduays uasydauycdcasudcbaudb yuadbu
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: FontSize.Small,
                  }}>
                  10.02.2020
                </Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
