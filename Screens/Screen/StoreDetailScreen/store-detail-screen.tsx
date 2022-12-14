import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {backgroundLine, banner1} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {getProductByFarmerId} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {I18n} from '../../translation';

import {getImage} from '../../utilities/format-utilities';
import {
  getFarmerLocation,
  getImageFarmer,
} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Product} from '../Models/product.model';
import {User} from '../Models/user.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {ProductCardHorizontal} from '../ui/product-card-horizontal/product-card-horizontal.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './store-detail.style';

export const StoreDetailScreen = ({route}) => {
  const userService = new UserService();
  const userId = route?.params?.userId;
  const [userInformation, setUserInformation] = useState<User>();
  const [productList, setProductList] = useState<Product[]>();

  const getData = async () => {
    const response = await userService.getUserById(userId);
    const data = response?.data;

    const responseProduct = await getProductByFarmerId(userId);
    const dataProduct = responseProduct?.data?.contents;

    setProductList(dataProduct);
    setUserInformation(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {userInformation && productList ? (
        <ScrollView>
          {/**Image farmer */}
          <View style={styles.goBackContainer}>
            <GoBackButton />
          </View>

          <View style={styles.storeImageContainer}>
            <Image
              source={getImageFarmer(userInformation?.avatar)}
              style={styles.storeImage}
            />
          </View>
          <Image source={backgroundLine} style={styles.backgroundLine} />
          <Text style={styles.storeName}>
            {userInformation?.firstName + ' ' + userInformation?.lastName}
          </Text>
          <Text style={styles.storeDescription}>
            Farmer Market l?? m???t trong nh???ng chu???i c???a h??ng th???c ph???m s???ch, th???c
            ph???m nh???p kh???u, tr??i c??y nh???p kh???u v?? b??n rau s???ch, l???n nh???t t???i Tp
            H??? Ch?? Minh. {'\n'}
            Farmer Market lu??n t??m ki???m nh???ng s???n ph???m t???t nh???t cho s???c kho???, t???
            nhi??n & h???u c??, ?????m b???o c??c ti??u chu???n ch???t l?????ng nghi??m ng???t c???a
            ng??nh.
            {'\n'}
            M???i ng??y, Farmer Market n???i l???c ph???c v??? kh??ch h??ng v???i d???ch v??? & s???n
            ph???m t???t nh???t, b???ng c??ch l??m vi???c v???i m???c ti??u ????a nh???ng s???n ph???m
            ch???t l?????ng t???t h??n, nh???m n??ng cao s???c kho??? t???t h??n cho con ng?????i,
            c???ng ?????ng v?? b???o v??? m??i tr?????ng t???t h??n.
          </Text>

          <View style={styles.storeInfoContainer}>
            <Text style={styles.contactInfoTitle}>
              {I18n.contactInformation}
            </Text>

            <Text style={styles.contactInfo}>
              {getFarmerLocation(userInformation?.location)}
            </Text>
          </View>

          {/** Products Area */}
          <View style={styles.productAreaContainer}>
            <Text style={styles.productsTitle}>{I18n.products}:</Text>

            {/** products Container */}
            {productList?.map(item => (
              <ProductCardHorizontal
                fruitImage={getImage(item?.images[0]?.url)}
                name={item?.name}
                weight={item?.weight}
                unit={item?.unit}
                storeImage={getImageFarmer(item?.farmer?.avatar)}
                storeName={
                  item?.farmer?.firstName + ' ' + item?.farmer?.lastName
                }
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
      ) : (
        <WaitingComponent />
      )}
    </View>
  );
};

// const ProductCard = ({product}: {product?: Product}) => {
//   return (
//     <View style={styles.productContainer}>
//       <TouchableOpacity
//         style={styles.productBackground}
//         onPress={() =>
//           globalNavigate('ProductDetailScreen', {productId: product?.id})
//         }>
//         <View style={styles.productImageBackground}>
//           <Image
//             source={getImage(product?.images[0]?.url)}
//             style={styles.productImage}
//           />
//         </View>

//         <View style={styles.productInfoContainer}>
//           <Text style={styles.productName}>{product?.name}</Text>

//           <Text style={styles.productAmount}>
//             {product?.weight} {product?.unit}
//           </Text>

//           <Text style={styles.productPublishDate}>
//             Published at {product?.date}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };
