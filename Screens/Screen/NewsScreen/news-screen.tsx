import {types} from '@babel/core';
import React, {useEffect, useRef, useState} from 'react';
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
import {NewsDetail} from '../Models/news.model';
import {NewsService} from '../../services/news.service';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {I18n} from '../../translation';
import {styles} from './new-screen.style';

const width = Dimensions.get('window').width;

export const NewsScreen = () => {
  const [newList, setNewList] = useState<NewsDetail[]>();
  const [loading, setLoading] = useState(false);
  const newService = new NewsService();

  const scrollView = useRef();
  const autoCurrentRound = current => {
    scrollView.current?.scrollTo({
      x: ((width * 50) / 100) * current,
      animated: true,
    });
  };

  const Choose = (index, item) => {
    autoCurrentRound(index);
    globalNavigate('NewDetailScreen', item);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => Choose(index, item)}
          style={[styles.sliderItem, styles.sliderNormal]}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.verticalCardBackground}
            source={{uri: item?.imageBanner}}>
            <View style={styles.verticalTextCard}>
              <Text numberOfLines={4} style={styles.title}>
                {item?.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const getData = async () => {
    setLoading(true);
    const response = await newService.getAllNews();
    setNewList(response?.data?.contents);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View style={{flex: 1}}>
      <WaitingComponent />
    </View>
  ) : (
    <ScrollView>
      <>
        <ImageBackground style={styles.container} source={newsBackground}>
          <View style={styles.containerBackground}>
            <Text style={styles.bigTitle}>{I18n.agricultureNew}</Text>
            <Text style={styles.mediumTitle}>
              {I18n.getAllYourNewsAboutAgricultureProduct}
            </Text>
          </View>
        </ImageBackground>

        <View style={{marginTop: -70}}>
          <Carousel
            data={newList?.filter(item => item?.category === '1')}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={(width * 45) / 100 + 40}
          />
        </View>

        <View style={{marginTop: 30}}>
          <Text style={styles.bigGreenTitle}>{I18n.latestNews}</Text>
          <Text style={styles.mediumGreenTitle}>{I18n.getAllLatestNews}</Text>
        </View>

        {newList
          ?.filter(item => item?.category === '2')
          ?.map(e => (
            <View style={{marginTop: 30}}>
              <TouchableOpacity
                style={styles.horizontalCard}
                onPress={() => globalNavigate('NewDetailScreen', e)}>
                <ImageBackground
                  source={{uri: e?.imageBanner}}
                  resizeMode={'cover'}
                  style={styles.verticalCardBackground}>
                  <LinearGradient
                    colors={[Colors.DarkGreen, Colors.DarkFuelGreen80]}
                    start={{x: 0.3, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.verticalCardBackground}>
                    <Text numberOfLines={2} style={styles.horizontalText}>
                      {e?.title}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: FontSize.Small,
                      }}>
                      {e?.date}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ))}
      </>
    </ScrollView>
  );
};
