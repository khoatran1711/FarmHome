import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './category-card-horizontal.style';

interface CategoryHorizontalCardProps {
  id?: number;
  name?: string;
  image?: ImageSourcePropType;
}

export const CategoryHorizontalCard = (props?: CategoryHorizontalCardProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerButton}>
        <View style={styles.imageContainer}>
          <Image source={props?.image} style={styles.image} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props?.name}</Text>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
