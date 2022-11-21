import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {
  seasonFallIcon,
  seasonSpringIcon,
  seasonSummerIcon,
  seasonWinterIcon,
  waitingBackground,
} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {styles} from './waiting.style';

export const WaitingComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        <ImageBackground
          source={waitingBackground}
          resizeMode={'stretch'}
          style={styles.dialogBackground}>
          <ActivityIndicator size="large" color={Colors.White} />
          <Text style={styles.loadingTitle}>Loading...</Text>
          <View style={styles.seasonContainer}>
            <View style={styles.seasonImageContainer}>
              <Image source={seasonSpringIcon} style={styles.seasonImage} />
            </View>

            <View style={styles.seasonImageContainer}>
              <Image source={seasonSummerIcon} style={styles.seasonImage} />
            </View>

            <View style={styles.seasonImageContainer}>
              <Image source={seasonFallIcon} style={styles.seasonImage} />
            </View>

            <View style={styles.seasonImageContainer}>
              <Image source={seasonWinterIcon} style={styles.seasonImage} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
