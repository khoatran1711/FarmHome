import React from 'react';
import {ImageBackground} from 'react-native';
import {Image, ScrollView, Text, View} from 'react-native';
import {backgroundNew} from '../../constants/assets.constants';
import {NewsDetail} from '../Models/news.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './new-detail-style';

export const NewDetailScreen = ({route}: any) => {
  const newDetail: NewsDetail = route?.params;
  return (
    <ScrollView>
      <ImageBackground
        source={backgroundNew}
        style={styles.headerBackground}
        resizeMode="cover">
        <GoBackButton />
        <>
          <Text style={styles.newTitle}>{newDetail?.title}</Text>
          <Text style={styles.newName}>{newDetail?.author}</Text>
          <Text style={styles.newDate}>{newDetail?.date}</Text>
        </>
      </ImageBackground>

      <View style={styles.newDescriptionContainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri: newDetail?.imageBanner,
          }}
        />
        <Text style={styles.newDescription}>{newDetail?.content}</Text>

        <Image
          style={styles.imageNew}
          source={{
            uri: newDetail?.imageContent,
          }}
        />
      </View>
    </ScrollView>
  );
};
