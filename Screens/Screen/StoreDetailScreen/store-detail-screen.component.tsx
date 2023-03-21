import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  backgroundLine,
  backgroundStoreDetail,
  banner,
  banner1,
  chatIcon,
  phoneIcon,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {getProductByFarmerId} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {I18n} from '../../translation';

import {getImage} from '../../utilities/format-utilities';
import {
  callNumber,
  getFarmerLocation,
  getImageFarmer,
} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Farmer} from '../Models/farmer.model';
import {Product} from '../Models/product.model';
import {User} from '../Models/user.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {ProductCardHorizontal} from '../ui/product-card-horizontal/product-card-horizontal.component';
import {ProductCardMini} from '../ui/product-card-mini/product-card-mini.component';
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
        // <ScrollView>
        //   {/**Image farmer */}
        //   <View style={styles.goBackContainer}>
        //     <GoBackButton />
        //   </View>

        //   <View style={styles.storeImageContainer}>
        //     <Image
        //       source={getImageFarmer(userInformation?.avatar)}
        //       style={styles.storeImage}
        //     />
        //   </View>
        //   <Image source={backgroundLine} style={styles.backgroundLine} />
        //   <Text style={styles.storeName}>
        //     {userInformation?.firstName + ' ' + userInformation?.lastName}
        //   </Text>
        //   <Text style={styles.storeDescription}>
        //     Farmer Market là một trong những chuỗi cửa hàng thực phẩm sạch, thực
        //     phẩm nhập khẩu, trái cây nhập khẩu và bán rau sạch, lớn nhất tại Tp
        //     Hồ Chí Minh. {'\n'}
        //     Farmer Market luôn tìm kiếm những sản phẩm tốt nhất cho sức khoẻ, tự
        //     nhiên & hữu cơ, đảm bảo các tiêu chuẩn chất lượng nghiêm ngặt của
        //     ngành.
        //     {'\n'}
        //     Mỗi ngày, Farmer Market nỗi lực phục vụ khách hàng với dịch vụ & sản
        //     phẩm tốt nhất, bằng cách làm việc với mục tiêu đưa những sản phẩm
        //     chất lượng tốt hơn, nhầm nâng cao sức khoẻ tốt hơn cho con người,
        //     cộng đồng và bảo vệ môi trường tốt hơn.
        //   </Text>

        //   <View style={styles.storeInfoContainer}>
        //     <Text style={styles.contactInfoTitle}>
        //       {I18n.contactInformation}
        //     </Text>

        //     <Text style={styles.contactInfo}>
        //       {getFarmerLocation(userInformation?.location)}
        //     </Text>
        //   </View>

        //   {/** Products Area */}
        //   <View style={styles.productAreaContainer}>
        //     <Text style={styles.productsTitle}>{I18n.products}:</Text>

        //     {/** products Container */}
        //     {productList?.map(item => (
        //       <ProductCardHorizontal
        //         fruitImage={getImage(item?.images[0]?.url)}
        //         name={item?.name}
        //         weight={item?.remainingWeight}
        //         unit={item?.unit}
        //         storeImage={getImageFarmer(item?.farmer?.avatar)}
        //         storeName={
        //           item?.farmer?.firstName + ' ' + item?.farmer?.lastName
        //         }
        //         address={getFarmerLocation(item?.farmer?.location)}
        //         onPress={() =>
        //           globalNavigate('ProductDetailScreen', {
        //             productId: item?.id,
        //           })
        //         }
        //       />
        //     ))}
        //   </View>
        // </ScrollView>
        <ScrollView>
          <ImageBackground
            resizeMode="stretch"
            source={backgroundStoreDetail}
            style={styles.imageBackground}>
            <GoBackButton />
            <View style={styles.imageFarmerContainer}>
              <Image
                source={getImageFarmer(userInformation?.avatar)}
                style={styles.storeImage}
              />
            </View>
          </ImageBackground>

          <Text style={styles.storeName}>
            {userInformation?.firstName + ' ' + userInformation?.lastName}
          </Text>

          <View style={styles.mediumLine} />

          <Text style={styles.storeDescription}>
            Farmer Market là một trong những chuỗi cửa hàng thực phẩm sạch, thực
            phẩm nhập khẩu, trái cây nhập khẩu và bán rau sạch, lớn nhất tại Tp
            Hồ Chí Minh. {'\n'}
            Farmer Market luôn tìm kiếm những sản phẩm tốt nhất cho sức khoẻ, tự
            nhiên và hữu cơ, đảm bảo các tiêu chuẩn chất lượng nghiêm ngặt của
            ngành.
            {'\n'}
            Mỗi ngày, Farmer Market nỗi lực phục vụ khách hàng với dịch vụ & sản
            phẩm tốt nhất, bằng cách làm việc với mục tiêu đưa những sản phẩm
            chất lượng tốt hơn, nhầm nâng cao sức khoẻ tốt hơn cho con người,
            cộng đồng và bảo vệ môi trường tốt hơn.
            {'\n'}
            Mỗi ngày, Farmer Market nỗi lực phục vụ khách hàng với dịch vụ & sản
            phẩm tốt nhất, bằng cách làm việc với mục tiêu đưa những sản phẩm
            chất lượng tốt hơn, nhầm nâng cao sức khoẻ tốt hơn cho con người,
            cộng đồng và bảo vệ môi trường tốt hơn.
          </Text>

          <View style={styles.line} />

          {userInformation && <ContactCard farmer={userInformation} />}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
            }}>
            {productList?.map(item => (
              <ProductCardMini
                image={getImage(item?.images[0]?.url)}
                name={item?.name}
                weight={item?.remainingWeight}
                unit={item?.unit}
                storeName={
                  item?.farmer?.firstName + ' ' + item?.farmer?.lastName
                }
                address={getFarmerLocation(item?.farmer?.location)}
                onPress={() =>
                  globalNavigate(ScreenName.ProductDetailScreen, {
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

export const Test = () => {
  return <></>;
};

const ContactCard = ({farmer}: {farmer: User}) => {
  return (
    <View style={styles.contactInfo}>
      <View style={{width: '70%'}}>
        <Text style={styles.phoneNumber}>{farmer?.phone}</Text>

        <Text style={styles.contactContent}>
          {getFarmerLocation(farmer?.location)}
        </Text>

        <Text style={styles.contactContent}>{farmer?.email}</Text>
      </View>

      <View style={styles.verticalLine} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => callNumber(farmer?.phone)}>
          <Image source={phoneIcon} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            globalNavigate(ScreenName.MessageDetailScreen, {
              farmerId: farmer?.id,
            })
          }>
          <Image source={chatIcon} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
