import React from 'react';
import {ImageBackground} from 'react-native';
import {Image, ScrollView, Text, View} from 'react-native';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {
  convertDateJsonToDateMonth,
  convertDateJsonToYear,
} from '../../utilities/help-utilities';
import {NewsDetail} from '../Models/news.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './new-detail-screen.style';

export const NewDetailScreen = ({route}: any) => {
  const newDetail: NewsDetail = route?.params;
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <GoBackButton buttonStyle={styles.backButton} />

          <View style={styles.dateContainer}>
            <View style={styles.verticalLine} />
            <View>
              <Text style={styles.mediumSmallTitle}>{I18n.day}</Text>
              <Text style={styles.normalBoldTitle}>
                {convertDateJsonToDateMonth(newDetail?.date)}
                {'\n'}
                {convertDateJsonToYear(newDetail?.date)}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{newDetail?.title}</Text>

          <ImageBackground
            style={styles.imageBanner}
            resizeMode={'contain'}
            source={getImage(newDetail?.imageBanner)}>
            <View style={styles.authorContainer}>
              <Text style={styles.mediumSmallTitle}>{I18n.author}</Text>
              <Text style={styles.normalBoldTitle}>{newDetail?.author}</Text>
            </View>
          </ImageBackground>

          <View style={styles.authorTitleContainer}>
            <Text style={styles.smallTitle}>
              {newDetail?.content?.replace('/n', '\n')}
            </Text>
          </View>

          <Image
            style={styles.imageContent}
            resizeMode={'cover'}
            source={getImage(newDetail?.imageContent)}
          />
        </ScrollView>
      </View>
    </>
  );
};
