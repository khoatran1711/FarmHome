import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {backgroundLine, banner1} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './store-detail.style';

export const StoreDetailScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/**Image farmer */}
        <View style={styles.goBackContainer}>
          <GoBackButton />
        </View>

        <View style={styles.storeImageContainer}>
          <Image source={banner1} style={styles.storeImage} />
        </View>
        <Image source={backgroundLine} style={styles.backgroundLine} />
        <Text style={styles.storeName}>My Home Farmer</Text>
        <Text style={styles.storeDescription}>
          Farmer Market là một trong những chuỗi cửa hàng thực phẩm sạch, thực
          phẩm nhập khẩu, trái cây nhập khẩu và bán rau sạch, lớn nhất tại Tp Hồ
          Chí Minh. {'\n'}
          Farmer Market luôn tìm kiếm những sản phẩm tốt nhất cho sức khoẻ, tự
          nhiên & hữu cơ, đảm bảo các tiêu chuẩn chất lượng nghiêm ngặt của
          ngành.
          {'\n'}
          Mỗi ngày, Farmer Market nỗi lực phục vụ khách hàng với dịch vụ & sản
          phẩm tốt nhất, bằng cách làm việc với mục tiêu đưa những sản phẩm chất
          lượng tốt hơn, nhầm nâng cao sức khoẻ tốt hơn cho con người, cộng đồng
          và bảo vệ môi trường tốt hơn.
        </Text>

        <View style={styles.storeInfoContainer}>
          <Text style={styles.contactInfoTitle}>Contact Info</Text>

          <Text style={styles.contactInfo}>
            666 Lạc Long Quân Phường 9 quận Tân Bình
          </Text>
        </View>

        {/** Products Area */}
        <View style={styles.productAreaContainer}>
          <Text style={styles.productsTitle}>Products:</Text>

          {/** products Container */}
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </View>
      </ScrollView>
    </View>
  );
};

const Product = () => {
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity
        style={styles.productBackground}
        onPress={() => globalNavigate('ProductDetailScreen')}>
        <View style={styles.productImageBackground}>
          <Image source={banner1} style={styles.productImage} />
        </View>

        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>Dâu Đà Lạt</Text>

          <Text style={styles.productAmount}>5.000 kilograms</Text>

          <Text style={styles.productPublishDate}>Published at 5:00</Text>

          <Text style={styles.productDescription} numberOfLines={3}>
            Dâu tây vườn hay gọi đơn giản là dâu tây (danh pháp khoa học:
            Fragaria × ananassa) là một chi thực vật hạt kín và loài thực vật có
            hoa thuộc họ Hoa hồng
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
