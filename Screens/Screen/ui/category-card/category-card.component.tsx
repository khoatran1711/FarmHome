import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {categoryCard} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {FontSize} from '../../../constants/fontsize.constants';
import {styles} from './category-card.style';

interface CategoryCardProps {
  id?: number;
  name?: string;
  image?: ImageSourcePropType;
}

export const CategoryCard = (props?: CategoryCardProps) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={categoryCard}
        resizeMode={'stretch'}
        style={styles.container}>
        <Image source={props?.image} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{props?.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
