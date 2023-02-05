import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  ToastAndroid,
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
import {
  globalGoBack,
  globalNavigate,
} from '../../utilities/navigator-utilities';
import {CustomBottomSheet} from '../ui/bottom-sheet-component/bottom-sheet.component';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from '../ui/radio-button-component/radio-button.component';
import {InputNumber} from '../ui/input-number-component/input-number.component';
import {getProduct, orderProduct} from '../../services/product.service';
import {OrderRequest, Product} from '../Models/product.model';
import {
  callNumber,
  convertDateToString,
  getFarmerLocation,
} from '../../utilities/help-utilities';
import {getImage} from '../../utilities/format-utilities';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {Slider} from '@miblanchard/react-native-slider';
import {ErrorHandler, setError} from '../../utilities/handdle-error';
import {places} from '../../utilities/constant-utilities';
import {useRootSelector} from '../../domain/hooks';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {I18n} from '../../translation';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
import {UserService} from '../../services/user.service';

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
  const productImage = productInformation?.images?.map((item, index) => {
    return {
      index: index,
      image: getImage(item?.url),
    };
  });

  const idFarmer = useRootSelector(AuthenticationSelectors.idSelector);
  const [isLoading, setIsLoading] = useState(false);

  const userService = new UserService();

  const Test = () => {
    const maximum = productInformation?.remainingWeight || 0;
    const [value, setValue] = useState('');
    const [isTransport, setIsTransport] = useState(false);
    const [money, setMoney] = useState('');

    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [wards, setWard] = useState('');
    const [wardsCode, setWardCode] = useState('');
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [opening, setOpening] = useState('');
    const [data, setData] = useState<any[]>();
    const [isDefaultAddress, setIsDefaultAddress] = useState(false);
    const [defaultLocation, setDefaultLocation] = useState('');
    const [defaultAddress, setDefaultAddress] = useState('');
    const [loadingAddress, setLoadingAddress] = useState(false);

    const getLocation = async (id: string) => {
      setLoadingAddress(true);
      const res = await userService.getLocation(id);
      const location = res?.data;
      setLoadingAddress(false);
      location && setDefaultLocation(location?.id);
      location && setDefaultAddress(getFarmerLocation(location));
    };

    const openCitySelect = () => {
      const cities = places?.map(item => {
        return {
          value: item?.province,
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
          value: item?.district,
          name: item?.district,
        };
      });
      setData(districts);
      setOpening('districts');
      setIsOpen(true);
    };

    const openWardSelect = () => {
      const cities = places?.find(item => item?.province === city)?.districts;
      const districts = cities?.find(
        item => item?.district === province,
      )?.wards;
      const wards = districts?.map(item => {
        return {
          value: item?.ward_code,
          name: item?.ward,
        };
      });

      setData(wards);
      setOpening('wards');
      setIsOpen(true);
    };

    const makeOrder = async (
      money,
      isTransport,
      amt,
      wardCode?,
      address?,
      isDefaultAddress?,
      defaultLocationId?,
    ) => {
      setIsLoading(true);
      let request: OrderRequest | any = productInformation && {
        fruit: {
          id: productInformation?.id,
        },
        farmer: {
          id: productInformation?.farmer?.id,
        },
        merchant: {
          id: idFarmer,
        },
        date: convertDateToString(new Date()),
        amount: amt,
        price: money,
        transport: isTransport,
        status: {
          id: 1,
        },
      };

      if (isTransport) {
        request = {
          ...request,
          deliveryLocation: !isDefaultAddress
            ? {
                address: address,
                ward: {
                  id: Number(wardCode),
                },
              }
            : {
                id: defaultLocationId,
              },
        };
      }
      const response = await orderProduct(request);

      setIsLoading(false);

      if (response?.isSuccess) {
        ToastAndroid.show(I18n.updateSuccessfully, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          I18n.somethingWentWrongPleaseTryAgain,
          ToastAndroid.SHORT,
        );
      }
    };
    let errorInput: ErrorHandler;

    const convertInputAmount = (text: string) => {
      let error: ErrorHandler = {
        isError: false,
        message: '',
      };

      text.replace(' ', '');

      if (text.includes('-')) {
        error = setError(true, I18n.amountContainIllegalCharacter);
        return error;
      }

      if (text.includes(',')) {
        text.replace(',', '.');
      }

      if (text?.split('.').length > 2) {
        error = setError(true, I18n.amountContainIllegalCharacter);
        return error;
      }

      if (parseFloat(text) > maximum) {
        error = setError(true, I18n.illegalAmount);
        return error;
      }

      if (parseFloat(text) < 1) {
        error = setError(
          true,
          I18n.smallestAmountIsOne.replace('{unit}', productInformation?.unit),
        );
        return error;
      }

      return error;
    };

    return (
      <View style={styles.bottomSheetContainer}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.bottomTitle}>{I18n.chooseNumberAmount}</Text>
            <Text style={styles.bottomTitle}>
              {value || 0} {productInformation?.unit}
            </Text>
            <Slider
              value={parseFloat(value)}
              minimumValue={0}
              maximumValue={maximum}
              step={1}
              onValueChange={newValue => {
                setValue(newValue[0].toString());
              }}
            />

            <Text style={styles.bottomTitle}>{I18n.chooseThePriceUnit}</Text>
            <InputNumber
              onTextChange={newValue => {
                newValue = newValue.replace('-', '');
                newValue = newValue.replace(',', '');
                newValue = newValue.replace(' ', '');
                setMoney(newValue.toString());
              }}
              value={Number(money).toString()}
            />

            <Text style={styles.bottomTitle}>{I18n.transportSupport}</Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <RadioButton
                isChoose={isTransport}
                title={I18n.yes}
                onPress={() => setIsTransport(true)}
              />
              <RadioButton
                isChoose={!isTransport}
                title={I18n.no}
                onPress={() => setIsTransport(false)}
              />
            </View>
            {isTransport && (
              <>
                <TouchableOpacity
                  style={styles.addressButton}
                  onPress={() => {
                    setIsDefaultAddress(true);
                    getLocation(idFarmer);
                    setCity('');
                    setProvince('');
                    setWard('');
                    setWardCode('');
                    setAddress('');
                  }}>
                  <Text style={styles.inputTitle}>{I18n.defaultAddress}</Text>
                </TouchableOpacity>

                {isDefaultAddress && (
                  <View style={styles.defaultAddressContainer}>
                    <Text style={styles.inputTitle}>{defaultAddress}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.addressButton}
                  onPress={() => {
                    setIsDefaultAddress(false);
                    setDefaultLocation('');
                    setDefaultAddress('');
                  }}>
                  <Text style={styles.inputTitle}>{I18n.newAddress}</Text>
                </TouchableOpacity>

                {!isDefaultAddress && (
                  <View style={styles.inputAddressInformationContainer}>
                    <View style={styles.infoInputContainer}>
                      <Text style={styles.inputTitle}>{I18n.city}</Text>
                      <TouchableOpacity
                        style={styles.addressInput}
                        onPress={() => openCitySelect()}>
                        <Text style={styles.inputTitle}>
                          {city || I18n.city}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.infoInputContainer}>
                      <Text style={styles.inputTitle}>{I18n.district}</Text>
                      <TouchableOpacity
                        style={styles.addressInput}
                        onPress={() => openProvinceSelect()}>
                        <Text style={styles.inputTitle}>
                          {province || I18n.district}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.infoInputContainer}>
                      <Text style={styles.inputTitle}>{I18n.ward}</Text>
                      <TouchableOpacity
                        style={styles.addressInput}
                        onPress={() => openWardSelect()}>
                        <Text style={styles.inputTitle}>
                          {wards || I18n.ward}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.infoInputContainer}>
                      <Text style={styles.inputTitle}>{I18n.address}</Text>
                      <TextInput
                        style={styles.inputText}
                        defaultValue={address}
                        onChangeText={e => setAddress(e)}
                      />
                    </View>
                  </View>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setShow(false);
                if (convertInputAmount(value).isError) {
                  Alert.alert(convertInputAmount(value).message);
                } else if (money === '0' || money === '' || !money) {
                  Alert.alert(I18n.illegalMoney);
                } else if (
                  ((wardsCode?.trim() === '' || address?.trim() === '') &&
                    !isDefaultAddress &&
                    isTransport) ||
                  (defaultLocation === '' && isDefaultAddress && isTransport)
                ) {
                  Alert.alert(I18n.pleaseChooseAddress);
                } else {
                  makeOrder(
                    money,
                    isTransport,
                    value,
                    wardsCode,
                    address,
                    isDefaultAddress,
                    defaultLocation,
                  );
                }
              }}>
              <Text style={styles.bottomTitle}>{I18n.send}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
        <SelectingScreenComponent
          isShow={isOpen}
          data={data}
          onSelect={e => {
            if (opening === 'city') {
              setCity(e?.name);
              setData([]);
              setOpening('');
              setIsOpen(false);
              setProvince('');
              setWard('');
              setWardCode('');
            }
            if (opening === 'districts') {
              setProvince(e?.name);
              setData([]);
              setOpening('');
              setIsOpen(false);
              setWard('');
              setWardCode('');
            }
            if (opening === 'wards') {
              setWard(e?.name);
              setWardCode(e?.value);
              setData([]);
              setOpening('');
              setIsOpen(false);
            }
          }}
          title=""
          onClose={() => {
            setIsOpen(false);
          }}
        />
        {loadingAddress && <WaitingComponent />}
      </View>
    );
  };

  const getData = async () => {
    setIsLoading(true);
    const response = await getProduct(productId);
    const data = response?.data;

    setProductInformation(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setProductInformation(null);
    getData();
  }, [productId]);

  return (
    <>
      <View style={styles.container}>
        {!isLoading ? (
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
                  {productInformation?.name}
                </Text>

                <Text style={styles.productDescription}>
                  {productInformation?.remainingWeight +
                    ' ' +
                    productInformation?.unit}
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
                  <Text style={styles.inStockUpNumber}> {I18n.getNow} </Text>
                </TouchableOpacity>

                <View style={styles.viewShopContainer}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      globalNavigate('StoreDetailScreen', {
                        userId: productInformation?.farmer?.id,
                      })
                    }>
                    <Text style={styles.viewShopTitle}>{I18n.viewFarm} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      callNumber(productInformation?.farmer?.phone)
                    }>
                    <Text style={styles.phoneNowTitle}>{I18n.phoneNow}</Text>
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
