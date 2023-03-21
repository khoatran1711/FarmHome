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
import {ScreenName} from '../../constants/screen-name.constant';
import {filterProduct, searchProduct} from '../../services/product.service';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {getFarmerLocation} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {
  FilterProductRequest,
  Product,
  SEASON_ENUM,
} from '../Models/product.model';
import {ProductCardVertical} from '../ui/product-card-vertical';
import {ProductCard} from '../ui/product-card/product-card.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './search-screen.style';

const width = Dimensions.get('window').width;
const bigger = new Animated.Value((width * 120) / 100);
let isChooseFilter = true;

const SORT_LIST = [
  {
    name: 'SORT BY',
    type_list: [
      {
        id: 1,
        name: 'Popular',
        isSelect: false,
      },
      // {
      //   id: 2,
      //   name: 'Hot',
      //   isSelect: false,
      // },
      // {
      //   id: 3,
      //   name: 'New',
      //   isSelect: false,
      // },
      // {
      //   id: 4,
      //   name: 'Amount',
      //   isSelect: false,
      // },
    ],
  },
  {
    name: 'THIS SEASON FRUITS',
    type_list: [
      {
        id: 1,
        name: SEASON_ENUM.Spring,
        isSelect: false,
      },
      {
        id: 2,
        name: SEASON_ENUM.Summer,
        isSelect: false,
      },
      {
        id: 3,
        name: SEASON_ENUM.Autumn,
        isSelect: false,
      },
      {
        id: 4,
        name: SEASON_ENUM.Winter,
        isSelect: false,
      },
    ],
  },
];

export const SearchScreen = ({route}) => {
  const navigator = useNavigation();
  const [chooseNumber, setChooseNumber] = useState(0);
  const [chooseList, setChooseList] = useState([]);
  const search = route?.params?.searchText || '';
  const [searchText, setSearchText] = useState();
  const [productList, setProductList] = useState();
  const [loading, setLoading] = useState(false);

  const [isPopular, setIsPopular] = useState(false);
  const [season, setSeason] = useState('');

  const req: FilterProductRequest = {
    no: 0,
    popular: route?.params?.popular,
    limit: 30,
    seasonList: route?.params?.seasonList || '',
    name: searchText || search,
  };

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

  const getData = async req => {
    console.log(req);
    setLoading(true);
    const response = await filterProduct(req);
    const {contents} = response?.data;
    setLoading(false);
    setProductList(contents);
  };

  useEffect(() => {
    getData(req);
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

          <Text style={styles.filterTitle}>{I18n.filter}</Text>
        </View>

        <View style={styles.sortContainer}>
          {SORT_LIST.map(sorttype => (
            <View style={styles.sortContentContainer}>
              <Text style={styles.sortByTitle}>{sorttype.name}</Text>
              <View style={styles.sortTypesContainer}>
                {sorttype.type_list.map(type => (
                  <TouchableOpacity
                    style={styles.typeContainer}
                    onPress={() =>
                      type?.name === 'Popular'
                        ? setIsPopular(!isPopular)
                        : setSeason(type?.name)
                    }>
                    {/*onPress={() => addToFilter(type)}>*/}
                    <Text
                      style={[
                        styles.typeName,
                        type.name === season && styles.typeNameSelected,
                        type.name === 'Popular' && isPopular
                          ? styles.typeNameSelected
                          : null,
                      ]}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.line} />
            </View>
          ))}
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 50,
              width: 100,
              height: 40,
              backgroundColor: Colors.DarkGreen,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              click();
              const filReq = {
                no: 0,
                popular: isPopular ? true : '',
                limit: 30,
                seasonList: season,
                name: searchText,
              };
              getData(filReq);
            }}>
            <Text>{I18n.apply}</Text>
          </TouchableOpacity>
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
              placeholder={`${I18n.explore}...`}
              onChangeText={e => setSearchText(e)}
            />
            <TouchableOpacity onPress={() => getData(req)}>
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
        {!loading ? (
          <>
            <Text style={styles.resultNumber}>
              {I18n.nResultsFound.replace('{n}', productList?.length)}
            </Text>
            <ScrollView>
              <View style={styles.allResultContainer}>
                {productList?.map(item => (
                  // <ProductCard
                  //   image={getImage(item?.images[0]?.url)}
                  //   name={item?.name}
                  //   weight={item?.remainingWeight}
                  //   unit={item?.unit}
                  //   storeName={
                  //     item?.farmer?.firstName + ' ' + item?.farmer?.lastName
                  //   }
                  //   address={getFarmerLocation(item?.farmer?.location)}
                  //   onPress={() =>
                  //     globalNavigate('ProductDetailScreen', {
                  //       productId: item?.id,
                  //     })
                  //   }
                  // />
                  <ProductCardVertical
                    product={item}
                    onPress={() =>
                      globalNavigate(ScreenName.ProductDetailScreen, {
                        productId: item?.id,
                      })
                    }
                  />
                ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <WaitingComponent />
        )}
      </View>
    </View>
  );
};

// const ProductCard = ({product}: {product: Product}) => {
//   return (
//     <TouchableOpacity
//       style={styles.productCardContainer}
//       onPress={() =>
//         globalNavigate('ProductDetailScreen', {
//           productId: product?.id,
//         })
//       }>
//       <View style={styles.borderCard}>
//         <Text
//           style={{
//             fontSize: 11,
//             width: '80%',
//             textAlign: 'center',
//             paddingTop: '5%',
//             // backgroundColor: 'red',
//           }}>
//           {product?.weight + ' ' + product?.unit}
//         </Text>
//       </View>
//       <View style={styles.productContainer}>
//         <Image
//           style={styles.productImage}
//           source={getImage(product?.images[0]?.url)}
//         />
//         <Text numberOfLines={2} style={styles.productName}>
//           {product?.name}
//         </Text>
//         <Text numberOfLines={1} style={styles.productFarmName}>
//           {product?.farmer?.firstName + ' ' + product?.farmer?.lastName}
//         </Text>
//         <Text numberOfLines={2} style={styles.productLocation}>
//           {getFarmerLocation(product?.farmer?.location)}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };
