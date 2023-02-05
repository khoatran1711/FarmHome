import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {backgroundComing} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const MessageScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={backgroundComing}
        style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: '30%'}}>
          <Text
            style={{
              fontSize: FontSize.ExtraLarge,
              marginLeft: '5%',
              color: Colors.White,
            }}>
            COMING SOON…
          </Text>
          <Text
            style={{
              marginTop: 14,
              width: '70%',
              fontSize: FontSize.MediumSmall,
              alignSelf: 'flex-end',
              textAlign: 'right',
              color: Colors.White,
              marginRight: '5%',
            }}>
            We will have this feature soon, hope you will wait for us
          </Text>
          <Text
            style={{
              marginTop: 3,
              width: '70%',
              fontSize: FontSize.SemiSmall,
              alignSelf: 'flex-end',
              textAlign: 'right',
              color: Colors.White,
              marginRight: '5%',
              fontStyle: 'italic',
            }}>
            -- FarmHome Team --
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
