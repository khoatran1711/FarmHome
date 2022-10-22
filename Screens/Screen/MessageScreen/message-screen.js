import React, {useRef, useEffect, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

export const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let isBig = false; // Initial value for opacity: 0
  const bigger = new Animated.Value(0);

  const click = () => {
    isBig = !isBig;
    console.log(isBig);
    return isBig
      ? Animated.timing(bigger, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start()
      : Animated.timing(bigger, {
          toValue: 200,
          duration: 1000,
          useNativeDriver: false,
        }).start();
  };

  return (
    <Animated.View // Special animatable View
      style={{
        marginLeft: bigger,
        width: 80,
        height: 80,
        backgroundColor: 'blue',
        opacity: 1, // Bind opacity to animated value
      }}>
      <TouchableOpacity onPress={() => click()}>
        <Text style={{color: 'red'}}>hello</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView
        style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
