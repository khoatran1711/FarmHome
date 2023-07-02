import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import Carousel from 'react-native-snap-carousel';
import {
  accountIcon,
  banner,
  calendarIcon,
  latestNew1,
  news1,
  newsBackground,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import Carousel from 'react-native-snap-carousel';

import {globalNavigate} from '../../utilities/navigator-utilities';
import {NewsDetail} from '../Models/news.model';
import {NewsService} from '../../services/news.service';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {I18n} from '../../translation';
import {styles} from './new-screen.style';
import {convertDateJsonToDate} from '../../utilities/help-utilities';
import {getImage} from '../../utilities/format-utilities';
import {ScreenName} from '../../constants/screen-name.constant';

const width = Dimensions.get('window').width;

export const NewsScreen = () => {
  const [newList, setNewList] = useState<NewsDetail[]>();
  const [loading, setLoading] = useState(false);
  const newService = new NewsService();

  const scrollView = useRef<ScrollView>();
  const autoCurrentRound = current => {
    scrollView.current?.scrollTo({
      x: ((width * 50) / 100) * current,
      animated: true,
    });
  };

  const Choose = (index, item) => {
    autoCurrentRound(index);
    globalNavigate(ScreenName.NewDetailScreen, item);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() => Choose(index, item)}>
        <ImageBackground
          source={getImage(item?.imageBanner)}
          style={styles.verticalCardBackground}>
          <View style={styles.verticalTextCard}>
            <View>
              <Text numberOfLines={1} style={styles.title}>
                {item?.title}
              </Text>
              <Text numberOfLines={2} style={styles.smallTitle}>
                {item?.content}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text
                numberOfLines={1}
                style={[styles.smallTitle, {width: '30%', textAlign: 'right'}]}>
                {item?.author}
              </Text>
              <Image source={accountIcon} style={styles.smallIcon} />
              <View
                style={{width: 1, height: '100%', backgroundColor: 'white'}}
              />
              <Image source={calendarIcon} style={styles.smallIcon} />
              <Text
                numberOfLines={1}
                style={[styles.smallTitle, {width: '30%', textAlign: 'left'}]}>
                {convertDateJsonToDate(item?.date)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const getData = async () => {
    setLoading(true);
    const response = await newService.getAllNews();
    setNewList(response?.data?.contents);
    setLoading(false);
  };

  const getDateWithoutLoading = async () => {
    const response = await newService.getAllNews();
    setNewList(response?.data?.contents);
  };

  useEffect(() => {
    getData();
  }, []);

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      getDateWithoutLoading();
    }, 2000);
  };

  return (
    <>
      <View style={styles.container}>
        {!loading && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => onRefresh()}
              />
            }>
            <>
              <ImageBackground
                style={styles.backgroundImageContainer}
                source={newsBackground}>
                <View style={styles.containerBackground}>
                  <Text style={styles.bigTitle}>{I18n.agricultureNew}</Text>
                  <Text style={styles.mediumTitle}>
                    {I18n.getAllYourNewsAboutAgricultureProduct}
                  </Text>
                </View>
              </ImageBackground>

              <View style={{marginTop: -70}}>
                <Carousel
                  data={newList?.filter(item => item?.category === '1') || []}
                  renderItem={renderItem}
                  sliderWidth={width}
                  itemWidth={(width * 70) / 100}
                />
              </View>

              <View style={{marginTop: 30}}>
                <Text style={styles.bigGreenTitle}>{I18n.latestNews}</Text>
                <Text style={styles.mediumGreenTitle}>
                  {I18n.getAllLatestNews}
                </Text>
              </View>

              {newList
                ?.filter(item => item?.category === '2')
                ?.map(e => (
                  <ItemHorizontalCard item={e} />
                ))}
            </>
          </ScrollView>
        )}
      </View>
      {loading && <WaitingComponent />}
    </>
  );
};

const ItemHorizontalCard = ({item}: {item: NewsDetail}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.horizontalCard}
        onPress={() => globalNavigate(ScreenName.NewDetailScreen, item)}>
        <Image
          source={getImage(item?.imageBanner)}
          style={styles.horizontalCardImage}
        />
        <View style={styles.horizontalCardContent}>
          <View
            style={[
              styles.verticalTextCard,
              {height: '100%', justifyContent: 'space-between'},
            ]}>
            <View style={{marginBottom: 10}}>
              <Text
                numberOfLines={1}
                style={[
                  styles.smallTitle,
                  {
                    fontSize: FontSize.Small,
                    fontWeight: '600',
                    color: Colors.Solitaire,
                  },
                ]}>
                {item?.title}
              </Text>
              <Text numberOfLines={2} style={styles.smallTitle}>
                {item?.content}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Image source={calendarIcon} style={styles.smallIcon} />
              <Text numberOfLines={1} style={[styles.smallTitle]}>
                {convertDateJsonToDate(item?.date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
