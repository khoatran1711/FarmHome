import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  backButtonIcon,
  banner1,
  cartIcon,
  filterIcon,
  searchIcon,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {searchProduct} from '../../services/product.service';
import {getImage} from '../../utilities/format-utilities';
import {getFarmerLocation} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Product} from '../Models/product.model';
import {styles} from './search-screen-style';

const width = Dimensions.get('window').width;
const bigger = new Animated.Value((width * 120) / 100);
let isChooseFilter = true;

const SORT_LIST = [
  {
    name: 'SORT BY',
    type_list: [
      {
        id: 1,
        name: 'Location',
        isSelect: false,
      },
      {
        id: 2,
        name: 'Hot',
        isSelect: false,
      },
      {
        id: 3,
        name: 'New',
        isSelect: false,
      },
      {
        id: 4,
        name: 'Amount',
        isSelect: false,
      },
    ],
  },
  {
    name: 'THIS SEASON FRUITS',
    type_list: [
      {
        id: 1,
        name: 'Trái cây 1',
        isSelect: false,
      },
      {
        id: 2,
        name: 'Trái cây 2',
        isSelect: false,
      },
      {
        id: 3,
        name: 'Trái cây 3',
        isSelect: false,
      },
      {
        id: 4,
        name: 'Trái cây 4',
        isSelect: false,
      },
      {
        id: 5,
        name: 'Trái cây 5',
        isSelect: false,
      },
    ],
  },
];

export const SearchScreen = ({route}) => {
  const navigator = useNavigation();
  const [chooseNumber, setChooseNumber] = useState(0);
  const [chooseList, setChooseList] = useState([]);
  const search = route?.params?.searchText;
  const [searchText, setSearchText] = useState(search);
  const [productList, setProductList] = useState();
  console.log(searchText);

  const addToFilter = selection => {
    if (selection.isSelect) {
      selection.isSelect = false;
      setChooseNumber(chooseNumber - 1);
      let newChooseList = chooseList;
      newChooseList.forEach((element, index) => {
        if (element === selection.name) {
          newChooseList.splice(index, 1);
          index--;
        }
      });
      setChooseList(newChooseList.filter(item => item !== selection.name));
    } else {
      selection.isSelect = true;
      setChooseNumber(chooseNumber + 1);
      let newChooseList = chooseList;
      newChooseList.push(selection.name);
      setChooseList(newChooseList);
    }
  };

  const click = () => {
    isChooseFilter = !isChooseFilter;
    return isChooseFilter
      ? Animated.timing(bigger, {
          toValue: (width * 120) / 100,
          duration: 800,
          useNativeDriver: false,
        }).start()
      : Animated.timing(bigger, {
          toValue: (width * 20) / 100,
          duration: 800,
          useNativeDriver: false,
        }).start();
  };

  const getData = async () => {
    const response = await searchProduct(searchText, 0);
    const {contents} = response?.data;

    setProductList(contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.filterContainer,
          {
            marginLeft: bigger,
          },
        ]}>
        <View style={styles.filterHeaderContainer}>
          <TouchableOpacity onPress={() => click()}>
            <Image source={backButtonIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.filterTitle}>FILTER</Text>
        </View>

        <View style={styles.sortContainer}>
          {SORT_LIST.map(sorttype => (
            <View style={styles.sortContentContainer}>
              <Text style={styles.sortByTitle}>{sorttype.name}</Text>
              <View style={styles.sortTypesContainer}>
                {sorttype.type_list.map(type => (
                  <TouchableOpacity
                    style={styles.typeContainer}
                    onPress={() => addToFilter(type)}>
                    <Text
                      style={[
                        styles.typeName,
                        type.isSelect && styles.typeNameSelected,
                      ]}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.line} />
            </View>
          ))}
        </View>
      </Animated.View>
      <View style={styles.searchContainer}>
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={backButtonIcon}
              style={{
                height: 25,
                width: 25,
                transform: [{scaleX: -1}],
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '70%',
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 36,
              borderRadius: 12,
            }}>
            <TextInput
              style={{width: '80%', fontSize: FontSize.MediumSmall}}
              placeholder="Explore..."
            />
            <TouchableOpacity
              onPress={() => navigator.navigate('SearchScreen')}>
              <Image
                source={searchIcon}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => click()}>
            <ImageBackground
              source={filterIcon}
              style={{
                height: 25,
                width: 25,
                zIndex: 500,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  width: '40%',
                  borderRadius: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  backgroundColor: Colors.FilterGreen,
                  fontSize: FontSize.ExtraSmall,
                }}>
                {chooseNumber}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultNumber}>50 results are found</Text>
        <ScrollView>
          <View style={styles.allResultContainer}>
            {productList?.map(item => (
              <ProductCard product={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const ProductCard = ({product}: {product: Product}) => {
  return (
    <TouchableOpacity
      style={styles.productCardContainer}
      onPress={() =>
        globalNavigate('ProductDetailScreen', {
          productId: product?.id,
        })
      }>
      <View style={styles.borderCard}>
        <Text
          style={{
            fontSize: 11,
            width: '80%',
            textAlign: 'center',
            paddingTop: '5%',
            // backgroundColor: 'red',
          }}>
          {product?.weight + ' ' + product?.unit}
        </Text>
      </View>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={getImage(product?.image)} />
        <Text numberOfLines={2} style={styles.productName}>
          {product?.name}
        </Text>
        <Text numberOfLines={1} style={styles.productFarmName}>
          {product?.farmer?.firstName + ' ' + product?.farmer?.lastName}
        </Text>
        <Text numberOfLines={2} style={styles.productLocation}>
          {getFarmerLocation(product?.farmer?.location)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
