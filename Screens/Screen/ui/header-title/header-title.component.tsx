import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './header-title.style';

interface HeaderTitleProps {
  title?: string;
}

export const HeaderTitle = (props?: HeaderTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props?.title}</Text>
      <View style={styles.line} />
    </View>
  );
};
