import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  backButtonIcon,
  filterIcon,
  searchIcon,
} from '../../constants/assets.constants';
import {CategoryList} from '../../constants/category.constant';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {Season} from '../../constants/seasons.constant';
import {useRootSelector} from '../../domain/hooks';
import {
  filterProduct,
  ProductService,
  searchProduct,
} from '../../services/product.service';
import {ProductListSelectors} from '../../state/product-list/product-list.selector';
import {I18n} from '../../translation';
import {places} from '../../utilities/constant-utilities';

import {globalNavigate} from '../../utilities/navigator-utilities';
import {
  FilterProductRequest,
  Product,
  SEASON_ENUM,
} from '../Models/product.model';
import {InputButtonWrapper} from '../ui/input-button-wrapper';
import {ProductCardVertical} from '../ui/product-card-vertical';
import {ProductCard} from '../ui/product-card/product-card.component';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './search-screen.style';

const width = Dimensions.get('window').width;
const bigger = new Animated.Value((width * 120) / 100);
let isChooseFilter = true;

export interface SearchRequest {
  params: {
    searchText: string;
    seasonList?: string;
    categoryList?: string;
    provinceId?: number;
    districtId?: number;
    image?: any;
  };
}

export const SearchScreen = ({route}: {route: SearchRequest}) => {
  const navigator = useNavigation();
  const search = route?.params?.searchText || '';
  const [searchText, setSearchText] = useState<string>('');
  const [pageNumber, setPageNumber] = useState(0);
  //const [productList, setProductList] = useState();
  const [loading, setLoading] = useState(false);

  const [opening, setOpening] = useState('');
  const [data, setData] = useState<any[]>();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openCitySelect = () => {
    const cities = places?.map(item => {
      return {
        value: item?.province_code,
        name: item?.province,
      };
    });
    setData(cities);
    setOpening('city');
    setIsOpen(true);
  };

  const openProvinceSelect = () => {
    const cities = places?.find(item => item?.province === city)?.districts;
    const districts = cities?.map(item => {
      return {
        value: item?.district_code,
        name: item?.district,
      };
    });
    setData(districts);
    setOpening('districts');
    setIsOpen(true);
  };

  const [filterReq, setFilterReq] = useState({
    no: pageNumber,
    limit: 10,
    seasonList:
      route?.params?.seasonList ||
      `${Season.Spring.value},${Season.Summer.value},${Season.Autumn.value},${Season.Winter.value}`,
    name: searchText || search,
    categoryList:
      route?.params?.categoryList ||
      `${CategoryList.Fruit.label},${CategoryList.Green.label},${CategoryList.Pea.label},${CategoryList.Spice.label},${CategoryList.Tuber.label}`,
    provinceId: null,
    districtId: null,
  });

  const [req, setReg] = useState<FilterProductRequest>(filterReq);
  console.log(req);

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
    setLoading(true);
    const response = await filterProduct(req);
    const {contents} = response?.data;
    setLoading(false);
    //setProductList(contents);
  };

  const getDataWithoutLoading = async req => {
    const response = await filterProduct(req);
    const {contents} = response?.data;

    //setProductList(contents);
  };

  const [refresh, setRefresh] = useState(false);

  const productList = useRootSelector(ProductListSelectors.productListSelector);
  const isLoading = useRootSelector(ProductListSelectors.isLoadingSelector);
  const totalItems = useRootSelector(ProductListSelectors.totalItemsSelector);

  const productService = new ProductService();

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      setPageNumber(0);
      productService.resetSearchProductList({...req, no: 0});
      getDataWithoutLoading(req);
    }, 1000);
  };

  useEffect(() => {
    //getData(req);
    if (route?.params?.image) {
      console.log('my image', route?.params?.image);
      productService.productDetect(route?.params?.image);
    } else {
      console.log('No image');
      productService.resetSearchProductList(req);
    }
  }, [req]);

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
          <View style={styles.sortContentContainer}>
            <Text style={styles.sortByTitle}>{I18n.seasonfruits}</Text>
            <View style={styles.sortTypesContainer}>
              {Object.values(Season)?.map(e => (
                <TouchableOpacity
                  style={styles.typeContainer}
                  onPress={() => {
                    if (filterReq?.seasonList?.includes(e?.value)) {
                      setFilterReq({
                        ...filterReq,
                        seasonList: filterReq?.seasonList?.replace(
                          e?.value,
                          '',
                        ),
                      });
                    } else {
                      setFilterReq({
                        ...filterReq,
                        seasonList: filterReq?.seasonList + ',' + e?.value,
                      });
                    }
                  }}>
                  <Text
                    style={[
                      styles.typeName,
                      filterReq?.seasonList?.includes(e?.value) &&
                        styles.typeNameSelected,
                    ]}>
                    {e?.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.line} />

            <Text style={styles.sortByTitle}>{I18n.category}</Text>
            <View style={styles.sortTypesContainer}>
              {Object.values(CategoryList)?.map(e => (
                <TouchableOpacity
                  style={styles.typeContainer}
                  onPress={() => {
                    if (filterReq?.categoryList?.includes(e?.label)) {
                      setFilterReq({
                        ...filterReq,
                        categoryList: filterReq?.categoryList?.replace(
                          e?.label,
                          '',
                        ),
                      });
                    } else {
                      setFilterReq({
                        ...filterReq,
                        categoryList: filterReq?.categoryList + ',' + e?.label,
                      });
                    }
                  }}>
                  <Text
                    style={[
                      styles.typeName,
                      filterReq?.categoryList?.includes(e?.label) &&
                        styles.typeNameSelected,
                    ]}>
                    {e?.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.line} />

            <Text style={styles.sortByTitle}>{I18n.address}</Text>

            <InputButtonWrapper
              label={I18n.city}
              wrapperStyle={styles.wrapperContainer}
              content={city}
              inputBackgroundColor={Colors.TimberGreen}
              onPress={() => openCitySelect()}
            />
            <InputButtonWrapper
              label={I18n.district}
              wrapperStyle={styles.wrapperContainer}
              inputBackgroundColor={Colors.TimberGreen}
              content={province}
              onPress={() => openProvinceSelect()}
            />
            {/* <View style={styles.sortTypesContainer}></View> */}
            <View style={styles.line} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 100,
                height: 40,
                backgroundColor: Colors.DarkGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                setFilterReq({
                  no: 0,
                  limit: 10,
                  seasonList: `${Season.Spring.value},${Season.Summer.value},${Season.Autumn.value},${Season.Winter.value}`,
                  name: searchText || search,
                  categoryList: `${CategoryList.Fruit.label},${CategoryList.Green.label},${CategoryList.Pea.label},${CategoryList.Spice.label},${CategoryList.Tuber.label}`,
                  provinceId: null,
                  districtId: null,
                });
                setCity('');
                setProvince('');
              }}>
              <Text>{I18n.refresh}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                width: 100,
                height: 40,
                backgroundColor: Colors.DarkGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                click();
                setReg(filterReq);
              }}>
              <Text>{I18n.apply}</Text>
            </TouchableOpacity>
          </View>
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

          {!route?.params?.image && (
            <>
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
                <TouchableOpacity
                  onPress={() => {
                    setReg({...req, name: searchText || ''});
                  }}>
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
                  }}></ImageBackground>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.resultContainer}>
        {!loading ? (
          <>
            <Text style={styles.resultNumber}>
              {I18n.nResultsFound.replace('{n}', totalItems?.toString())}
            </Text>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refresh || isLoading}
                  onRefresh={() => onRefresh()}
                />
              }
              onScroll={({nativeEvent}) => {
                // Nếu cuộn đến cuối và đang không tải dữ liệu mới
                if (
                  nativeEvent.contentOffset.y >=
                    nativeEvent.contentSize.height - DEVICE.HEIGHT + 50 &&
                  !isLoading
                ) {
                  setPageNumber(pageNumber + 1);
                  productService.searchProductList({
                    ...req,
                    no: pageNumber + 1,
                  });
                }
              }}>
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

      <SelectingScreenComponent
        isShow={isOpen}
        data={data}
        onSelect={e => {
          if (opening === 'city') {
            setCity(e?.name);
            setFilterReq({...filterReq, provinceId: e?.value});
            setData([]);
            setOpening('');
            setIsOpen(false);
            setProvince('');
          }
          if (opening === 'districts') {
            setProvince(e?.name);
            setFilterReq({...filterReq, districtId: e?.value});
            setData([]);
            setOpening('');
            setIsOpen(false);
          }
        }}
        title={opening === 'city' ? I18n.city : I18n.district}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </View>
  );
};

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
