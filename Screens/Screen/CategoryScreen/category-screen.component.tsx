import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CategoryList} from '../../constants/category.constant';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {I18n} from '../../translation';
import {CategoryCard} from '../ui/category-card';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './category-screen.style';

export const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <GoBackButton />
        <Text style={styles.title}>{I18n.allCategory}</Text>
        {Object.values(CategoryList)?.map(e => (
          <CategoryCard id={e.id} name={e.name} image={e.image} />
        ))}
      </ScrollView>
    </View>
  );
};
