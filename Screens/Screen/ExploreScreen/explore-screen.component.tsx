import {fontSize} from '@mui/system';
import {useNavigation} from '@react-navigation/native';
import {selection} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
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
  cameraIcon,
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
import {useRootSelector} from '../../domain/hooks';
import {getAllProduct, ProductService} from '../../services/product.service';
import {ExploreSelectors} from '../../state/explore/explore.selector';
import {I18n} from '../../translation';
import {getImage} from '../../utilities/format-utilities';
import {ErrorHandle, getFarmerLocation} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Product} from '../Models/product.model';
import {CategoryHorizontalCard} from '../ui/category-card-horizontal';
import {ProductCardHorizontal} from '../ui/product-card-horizontal/product-card-horizontal.component';
import {ProductCardMini} from '../ui/product-card-mini/product-card-mini.component';
import {ProductCard} from '../ui/product-card/product-card.component';
import {styles} from './explore-screen.style';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {CustomBottomSheet} from '../ui/bottom-sheet-component/bottom-sheet.component';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
  //const [productList, setProductList] = useState<Product[]>();
  const [searchText, setSearchText] = useState('');
  const [showOptionImage, setOptionImage] = useState(false);

  const getData = async () => {
    const response = await getAllProduct();
    const {contents} = response?.data;

    //setProductList(contents);
  };

  const productList = useRootSelector(ExploreSelectors.productListSelector);
  const pageNumber = useRootSelector(ExploreSelectors.pageNumberSelector);
  const isLoading = useRootSelector(ExploreSelectors.isLoadingSelector);

  const productService = new ProductService();

  const [refresh, setRefresh] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openLibrary = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options as any, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        //let source = response;
        // You can also display the  image using data:

        if (response && response?.assets && response?.assets[0]) {
          globalNavigate(ScreenName.SearchScreen, {
            image: response?.assets[0],
          });
          //productService.productDetect(response?.assets[0]);
        }
      }
    });
  };

  const openCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options as any, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        //let source = response;
        // You can also display the  image using data:

        if (response && response?.assets && response?.assets[0]) {
          globalNavigate(ScreenName.SearchScreen, {
            image: response?.assets[0],
          });
        }
      }
    });
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      productService.resetProductList();
    }, 2000);
  };

  useEffect(() => {
    getData();
    productService.getExploreProduct();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
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
            pageNumber && productService.getExploreProduct();
          }
        }}
        scrollEventThrottle={400}>
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
              <TouchableOpacity onPress={() => setOptionImage(true)}>
                <Image
                  source={cameraIcon}
                  style={[styles.icon, {opacity: 0.5, width: 20, height: 20}]}
                />
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
      <CustomBottomSheet
        height="17%"
        visible={showOptionImage}
        children={
          <View style={styles.optionImageContainer}>
            <TouchableOpacity
              onPress={() => {
                setOptionImage(false);
                requestCameraPermission();
              }}>
              <Text style={styles.optionImageTitle}>{I18n.openCamera}</Text>
            </TouchableOpacity>

            <View style={styles.optionImageLine} />

            <TouchableOpacity
              onPress={() => {
                setOptionImage(false);
                openLibrary();
              }}>
              <Text style={styles.optionImageTitle}>{I18n.openLibrary}</Text>
            </TouchableOpacity>
          </View>
        }
        onClose={() => {
          setOptionImage(false);
        }}
      />
    </GestureHandlerRootView>
  );
};
