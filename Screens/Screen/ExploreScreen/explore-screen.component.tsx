import {fontSize} from '@mui/system';
import {useNavigation} from '@react-navigation/native';
import {selection} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  backButtonIcon,
  banner,
  banner1,
  defaultFruit,
} from '../../constants/assets.constants';
import {
  categoryIcon,
  searchIcon,
  cartIcon,
  filterIcon,
  exploreBanner1,
  exploreBanner2,
  exploreBanner3,
  filterchosen,
} from '../../constants/assets.constants';
import {CategoryList} from '../../constants/category.constant';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {getAllProduct} from '../../services/product.service';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getFarmerLocation} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Product} from '../Models/product.model';
import {CategoryHorizontalCard} from '../ui/category-card-horizontal';
import {ProductCardHorizontal} from '../ui/product-card-horizontal/product-card-horizontal.component';
import {ProductCardMini} from '../ui/product-card-mini/product-card-mini.component';
import {ProductCard} from '../ui/product-card/product-card.component';
import {styles} from './explore-screen.style';

const filterList = [
  {
    id: 1,
    name: 'Trái cây 1',
  },
  {
    id: 2,
    name: 'Trái cây 2',
  },
  {
    id: 3,
    name: 'Trái cây 3',
  },
  {
    id: 4,
    name: 'Trái cây 4',
  },
  {
    id: 5,
    name: 'Trái cây 5',
  },
];

export const ExploreScreen = () => {
  const navigator = useNavigation();
  const [selectList, setSelectList] = useState(filterList[0].id);
  const [productList, setProductList] = useState<Product[]>();
  const [searchText, setSearchText] = useState('');

  const getData = async () => {
    const response = await getAllProduct();
    const {contents} = response?.data;

    setProductList(contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          borderBottomRightRadius={80}
          style={styles.bannerBackground}
          source={exploreBanner3}>
          <View style={styles.exploreHeaderContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={`${I18n.explore}...`}
                onChangeText={value => setSearchText(value)}
              />
              <TouchableOpacity
                onPress={() =>
                  globalNavigate(ScreenName.SearchScreen, {
                    searchText: searchText,
                  })
                }>
                <Image source={searchIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity>
              <Image source={cartIcon} style={styles.icon} />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{I18n.category}</Text>
          <TouchableOpacity
            onPress={() => globalNavigate(ScreenName.CategoryScreen)}>
            <Text style={styles.categoryAllTitle}>{I18n.all + ' »'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryCardContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.values(CategoryList).map(
              (item, index) =>
                index < 3 && (
                  <CategoryHorizontalCard
                    id={item?.id}
                    name={item?.name}
                    image={item?.image}
                  />
                ),
            )}
          </ScrollView>
        </View>

        {productList?.map(item => (
          <ProductCardHorizontal
            fruitImage={getImage(item?.images[0]?.url)}
            name={item?.name}
            weight={item?.remainingWeight}
            unit={item?.unit}
            storeName={item?.farmer?.firstName + ' ' + item?.farmer?.lastName}
            address={getFarmerLocation(item?.farmer?.location)}
            onPress={() =>
              globalNavigate(ScreenName.ProductDetailScreen, {
                productId: item?.id,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};
