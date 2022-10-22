import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {
  banner,
  leafOneIcon,
  leafTwoIcon,
} from '../../constants/assets.constants';
import {getImageListByType} from '../../utilities/format-utilities';
import {styles} from './new-detail-style';

export const NewDetailScreen = () => {
  let listImage = getImageListByType(2);
  return (
    <ScrollView>
      <Text style={styles.newTitle}>
        Bảo tồn, nhân rộng diện tích chè di sản ở Hà Giang
      </Text>
      <Text style={styles.newName}>Nguyễn Văn A</Text>
      <Text style={styles.newDate}>10.02.2022</Text>

      <View style={styles.newDescriptionContainer}>
        <Text style={styles.newDescription}>
          Hà Giang hiện có hơn 20.300ha chè và là địa phương có diện tích chè
          đứng thứ 3 cả nước. Chè Hà Giang chủ yếu là giống chè shan tuyết với
          diện tích hơn 18.600ha. Năm 2018, chè shan tuyết Hà Giang được Cục Sở
          hữu trí tuệ cấp chỉ dẫn địa lý cho diện tích thuộc 44 xã tại các
          huyện, thành phố, gồm: Bắc Quang (4 xã), Quang Bình (8 xã), Vị Xuyên
          (8 xã), Hoàng Su Phì (11 xã), Xín Mần (11 xã) và Thành phố Hà Giang (2
          xã).
        </Text>
        <Image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            marginTop: 20,
            marginBottom: 20,
          }}
          source={{
            uri: 'https://i.ex-cdn.com/nongnghiep.vn/files/bao_in/2022/10/06/watermark_z3758819603766_42dc69dae3049e62905d256b2c78e78a-1341_20221006_180-153148.jpeg',
          }}
        />
        <Text style={styles.newDescription}>
          Gắn liền với việc khai thác, nâng cao giá trị kinh tế và nâng tầm
          thương hiệu, Hà Giang cũng chú trọng bảo tồn cây chè di sản. Tỉnh Hà
          Giang có vùng chè 1.629 cây đã được công nhận là cây di sản, trong đó
          riêng năm 2022 có 1.324 cây được công nhận. Hà Giang cũng là tỉnh có
          số lượng cây chè shan tuyết cổ thụ được công nhận là Cây Di sản Việt
          Nam nhiều nhất cả nước. {'\n'} {'\n'}Ông Giang Đức Hiệp, Chi cục
          trưởng Chi cục Trồng trọt và BVTV Hà Giang cho biết, nhằm bảo tồn
          nguồn gen quý của chè shan tuyết Hà Giang, năm 2020, Sở NN-PTNT Hã
          Giang đã tổ chức công nhận được 100 cây chè shan tuyết đầu dòng tại 5
          huyện là Hoàng Su Phì (38 cây), Xín Mần (19 cây), Vị Xuyên (31 cây),
          Bắc Quang (08 cây) và Quang Bình (4 cây). Việc công nhận này nhằm bảo
          vệ, lai tạo, nhân rộng những cây chè di sản cổ thụ quý hiếm. {'\n'}
          {'\n'}HTX Chế biến chè Phìn Hồ, xã Thông Nguyên (huyện Hoàng Su Phì)
          thành lập từ năm 2008. Đây cũng là một trong những tổ chức có diện
          tích chè di sản lớn nhất tỉnh Hà Giang. Ban đầu, HTX chủ yếu chế biến
          chè tươi thành chè xanh theo phương pháp truyền thống, mỗi năm sản
          xuất được khoảng 5 tấn chè khô. Năm 2017, nhờ có sự hỗ trợ của hương
          trình giảm nghèo dựa trên phát triển hàng hóa tỉnh Hà Giang, cộng với
          nguồn vốn tự có, HTX đầu tư hơn 5 tỷ đồng xây dựng cơ sở hạ tầng và
          đổi mới toàn bộ dây chuyền sản xuất, nâng công suất chế biến lên 15
          tấn chè búp tươi/ngày.
        </Text>

        <Image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            marginTop: 20,
            marginBottom: 20,
          }}
          source={{
            uri: 'https://i.ex-cdn.com/nongnghiep.vn/files/bao_in/2022/10/06/watermark_z3770048638566_3d62da63e61b153520d2e2ae2912e0fb-1342_20221006_213-153149.jpeg',
          }}
        />
      </View>
    </ScrollView>
  );
};
