import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  backgroundLine,
  banner,
  banner1,
  new1,
} from '../../constants/assets.constants';
import {styles} from './product-detail.style';
import Carousel from 'react-native-snap-carousel';
import {Colors} from '../../constants/color.constants';
import {ImageBackground} from 'react-native';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {CustomBottomSheet} from '../ui/bottom-sheet-component/bottom-sheet.component';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RadioButton} from '../ui/radio-button-component/radio-button.component';
import {InputNumber} from '../ui/input-number-component/input-number.component';
import {getProduct} from '../../services/product.service';
import {Product} from '../Models/product.model';
import {callNumber, getFarmerLocation} from '../../utilities/help-utilities';
import {getImage} from '../../utilities/format-utilities';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {Slider} from '@miblanchard/react-native-slider';
import {ErrorHandler, setError} from '../../utilities/handdle-error';
import {places} from '../../utilities/constant-utilities';

const sliderItem = [
  {
    index: 0,
    image: banner1,
  },
  {
    index: 1,
    image: banner,
  },
  {
    index: 2,
    image: banner1,
  },
  {
    index: 3,
    image: new1,
  },
  {
    index: 4,
    image: banner1,
  },
  {
    index: 5,
    image: banner,
  },
];

const loadImage = ({item}) => {
  return (
    <View style={styles.imageWrapper}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export const ProductDetailScreen = ({route}) => {
  const [show, setShow] = useState(false);

  const productId = route?.params?.productId;
  const [productInformation, setProductInformation] = useState<Product>();
  const productImage = [
    {
      index: 4,
      image: getImage(productInformation?.image),
    },
  ];

  const Test = () => {
    const maximum = productInformation?.weight || 0;
    const [value, setValue] = useState('');
    const [isTransport, setIsTransport] = useState(false);
    let errorInput: ErrorHandler;

    const convertInputAmount = (text: string) => {
      let error: ErrorHandler = {
        isError: false,
        message: '',
      };

      if (text.includes('-') || text.includes(' ')) {
        error = setError(true, 'Số lượng chứ ký tự không hợp lệ');
        return error;
      }

      text.replace(',', '.');

      if (text?.split('.').length > 2) {
        error = setError(true, 'Số lượng chứa ký tự không hợp lệ');
        return error;
      }

      if (parseFloat(text) > maximum) {
        error = setError(true, 'Số lượng không hợp lệ ');
        return error;
      }

      if (parseFloat(text) < 1) {
        error = setError(true, 'Số lượng đặt ít nhất là 1 kg ');
        return error;
      }

      return error;
    };

    return (
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.bottomTitle}>Chọn số lương cần đặt</Text>

          <Slider
            value={parseFloat(value)}
            minimumValue={0}
            maximumValue={maximum}
            step={1}
            onValueChange={newValue => {
              setValue(newValue[0].toString());
            }}
          />

          <InputNumber
            onTextChange={newValue => {
              setValue(newValue.toString());
            }}
            value={value}
          />

          <Text style={styles.bottomTitle}>Hỗ trợ vận chuyển</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <RadioButton
              isChoose={isTransport}
              title="Có"
              onPress={() => setIsTransport(true)}
            />
            <RadioButton
              isChoose={!isTransport}
              title="Không"
              onPress={() => setIsTransport(false)}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              setShow(false);
              if (convertInputAmount(value).isError) {
                Alert.alert(convertInputAmount(value).message);
              } else {
                Alert.alert('Bạn đã đặt thành công 1 Cánh Thiên Không');
              }
            }}>
            <Text style={styles.bottomTitle}>Gửi</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  const getData = async () => {
    const response = await getProduct(productId);
    const data = response?.data;

    setProductInformation(data);
  };

  useEffect(() => {
    setProductInformation(null);
    getData();
  }, [productId]);

  return (
    <>
      <View style={styles.container}>
        {productInformation ? (
          <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.headerContainer}>
              <TouchableOpacity>
                <Image style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageProductContainer}>
              <View style={styles.imageProductBackground}>
                <GoBackButton />
              </View>
              <View style={styles.imageContainer}>
                <Carousel
                  sliderWidth={300}
                  sliderHeight={100}
                  itemWidth={300}
                  data={productImage}
                  renderItem={loadImage}
                  autoplay={true}
                  autoplayInterval={5000}
                  hasParallaxImages={true}
                />
              </View>
            </View>
            <ImageBackground
              source={backgroundLine}
              style={styles.contentContainer}>
              <View style={styles.productInformation}>
                <Text style={styles.productDate}>
                  {productInformation?.date}
                </Text>
                <Text style={styles.productName}>
                  {' '}
                  {productInformation?.name}{' '}
                </Text>

                <Text style={styles.productDescription}>
                  {productInformation?.weight + ' ' + productInformation?.unit}
                </Text>

                <View style={styles.farmerInformation}>
                  <Text style={styles.farmerTitle}>
                    {' '}
                    {productInformation?.farmer?.firstName +
                      ' ' +
                      productInformation?.farmer?.lastName}
                  </Text>
                  <Text style={styles.farmerInfo}>
                    {getFarmerLocation(productInformation?.farmer?.location)}
                  </Text>

                  <Text style={styles.farmerInfo}>
                    Hotline - {productInformation?.farmer?.phone}
                  </Text>

                  <Text style={styles.farmerInfo}>
                    {' '}
                    {productInformation?.farmer?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.rightButton}>
                <TouchableOpacity
                  style={styles.inStockUp}
                  onPress={() => setShow(true)}>
                  {/* <Text style={styles.inStockUpTitle}> In StockUp </Text> */}
                  <Text style={styles.inStockUpNumber}> Get Now </Text>
                </TouchableOpacity>

                <View style={styles.viewShopContainer}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      globalNavigate('StoreDetailScreen', {
                        userId: productInformation?.farmer?.id,
                      })
                    }>
                    <Text style={styles.viewShopTitle}>View Farm </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      callNumber(productInformation?.farmer?.phone)
                    }>
                    <Text style={styles.phoneNowTitle}>Phone Now </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            <CustomBottomSheet
              visible={show}
              children={<Test />}
              onClose={() => {
                setShow(false);
              }}
            />
          </GestureHandlerRootView>
        ) : (
          <WaitingComponent />
        )}
      </View>
    </>
  );
};
