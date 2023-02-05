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
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {getAllProduct} from '../../services/product.service';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getFarmerLocation} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Product} from '../Models/product.model';
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
  const [productLis, setProductList] = useState();
  const [searchText, setSearchText] = useState('');

  const getData = async () => {
    const response = await getAllProduct();
    const {contents} = response?.data;
    console.log(response);
    setProductList(contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
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
                  globalNavigate('SearchScreen', {
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

        {/* <ScrollView
          style={styles.categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {filterList.map(filter => (
            <View style={styles.categoryContainer} key={filter.id}>
              <TouchableOpacity onPress={() => setSelectList(filter.id)}>
                <ImageBackground
                  resizeMode="stretch"
                  style={{
                    width: 100,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={selectList === filter.id && filterchosen}>
                  <Text
                    style={{color: Colors.YellowGreen, marginHorizontal: 10}}>
                    {filter.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              {selectList === filter.id && (
                <View style={styles.chooseCategoryContainer}>
                  <View style={styles.chooseCategory} />
                </View>
              )}
            </View>
          ))}
        </ScrollView> */}
        {/* <View style={styles.categoryProductContainer}>
          <TouchableOpacity>
            <View style={styles.productContainer}>
              <ImageBackground source={banner} style={styles.productBackground}>
                <View style={styles.backgroundBlack}>
                  <Text style={styles.productName}>Orange</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
          {productLis?.map(item => (
            <ProductCardMini
              image={getImage(item?.images[0]?.url)}
              name={item?.name}
              weight={item?.remainingWeight}
              unit={item?.unit}
              storeName={item?.farmer?.firstName + ' ' + item?.farmer?.lastName}
              address={getFarmerLocation(item?.farmer?.location)}
              onPress={() =>
                globalNavigate('ProductDetailScreen', {
                  productId: item?.id,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// const ProductCard = ({product}: {product: Product}) => {
//   return (
//     <TouchableOpacity
//       style={styles.cardContainer}
//       onPress={() =>
//         globalNavigate('ProductDetailScreen', {
//           productId: product.id,
//         })
//       }>
//       <View style={styles.imageContainer}>
//         <Image
//           style={styles.image}
//           source={getImage(product?.images[0]?.url)}
//         />
//       </View>
//       <Text style={styles.productCardName}>{product?.name}</Text>
//       <Text style={styles.farmerCardName}>
//         {product?.farmer?.firstName + ' ' + product?.farmer?.lastName}
//       </Text>
//       <Text numberOfLines={2} style={styles.farmerCardAddress}>
//         {getFarmerLocation(product?.farmer?.location)}
//       </Text>

//       <Text numberOfLines={2} style={styles.seeMore}>
//         Xem chi tiết {'>>'}
//       </Text>
//     </TouchableOpacity>
//   );
// };
