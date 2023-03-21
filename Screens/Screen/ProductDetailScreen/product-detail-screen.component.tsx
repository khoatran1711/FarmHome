import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
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
  chatIcon,
  defaultFruit,
  fruitProductDetail,
  new1,
  phoneIcon,
  suggestPriceIcon,
  validAmountIcon,
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
import {DEVICE} from '../../constants/devices.constant';
import {FontSize} from '../../constants/fontsize.constants';
import {IconWithLabel} from '../ui/icon-with-label';
import {User} from '../Models/user.model';
import {Button} from '../ui/button';
import {Farmer} from '../Models/farmer.model';
import {ScreenName} from '../../constants/screen-name.constant';
import {InputWrapper} from '../ui/input-wrapper';
import {InputButtonWrapper} from '../ui/input-button-wrapper';

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
  const [productInformation, setProductInformation] =
    useState<Product | null>();
  const productImage = productInformation?.images?.map((item, index) => {
    return {
      index: index,
      image: getImage(item?.url),
    };
  });

  const idFarmer = useRootSelector(AuthenticationSelectors.idSelector);
  const [isLoading, setIsLoading] = useState(false);

  const userService = new UserService();

  const InputInformation = () => {
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
          I18n.smallestAmountIsOne.replace(
            '{unit}',
            productInformation?.unit || '',
          ),
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
              thumbTintColor={Colors.Solitaire}
              minimumTrackTintColor={Colors.Solitaire}
              maximumTrackTintColor={Colors.Solitaire90}
            />

            <InputWrapper
              label={I18n.chooseThePriceUnit}
              numberOnly={true}
              onTextChange={newValue => {
                newValue = newValue.replace('-', '');
                newValue = newValue.replace(',', '');
                newValue = newValue.replace(' ', '');
                setMoney(newValue.toString());
              }}
              wrapperStyle={styles.wrapperStyle}
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
                <View style={styles.marginTop10}>
                  <RadioButton
                    isChoose={isDefaultAddress}
                    title={I18n.defaultAddress}
                    onPress={() => {
                      setIsDefaultAddress(true);
                      getLocation(idFarmer?.toString() || '');
                      setCity('');
                      setProvince('');
                      setWard('');
                      setWardCode('');
                      setAddress('');
                    }}
                    buttonStyle={styles.smallRadioButton}
                  />
                  <RadioButton
                    isChoose={!isDefaultAddress}
                    title={I18n.newAddress}
                    onPress={() => {
                      setIsDefaultAddress(false);
                      setDefaultLocation('');
                      setDefaultAddress('');
                    }}
                    buttonStyle={styles.smallRadioButton}
                  />
                </View>

                {isDefaultAddress && (
                  <InputWrapper
                    label={I18n.address}
                    disable={true}
                    value={defaultAddress}
                    multipleLine={true}
                    wrapperStyle={styles.wrapperStyle}
                  />
                )}

                {!isDefaultAddress && (
                  <View style={styles.inputAddressInformationContainer}>
                    <InputButtonWrapper
                      label={I18n.city}
                      wrapperStyle={styles.wrapperStyle}
                      content={city}
                      onPress={() => openCitySelect()}
                    />

                    <InputButtonWrapper
                      label={I18n.district}
                      wrapperStyle={styles.wrapperStyle}
                      content={province}
                      onPress={() => openProvinceSelect()}
                    />

                    <InputButtonWrapper
                      label={I18n.ward}
                      wrapperStyle={styles.wrapperStyle}
                      content={wards}
                      onPress={() => openWardSelect()}
                    />

                    <InputWrapper
                      label={I18n.address}
                      wrapperStyle={styles.wrapperStyle}
                      onTextChange={e => setAddress(e)}
                    />
                  </View>
                )}
              </>
            )}

            <Button
              title={I18n.send}
              buttonStyle={styles.submitButton}
              titleStyle={styles.submitTitle}
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
              }}
            />
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

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <>
      <View style={styles.container}>
        {!isLoading ? (
          <GestureHandlerRootView>
            <ScrollView>
              <ImageBackground
                source={fruitProductDetail}
                resizeMode={'stretch'}
                style={styles.imageBackground}>
                <GoBackButton />
                <ImageShowing
                  imageSource={getImage(
                    productInformation?.images[selectedImageIndex]?.url,
                  )}
                />
                <View style={styles.productImageMiniContainer}>
                  {productInformation?.images?.map((item, index) => (
                    <TouchableOpacity
                      style={styles.productImageMini}
                      onPress={() => setSelectedImageIndex(index)}>
                      <Image
                        source={getImage(item?.url)}
                        style={styles.productMini}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ImageBackground>

              <Text style={styles.productName}>
                {productInformation?.name.toUpperCase()}
              </Text>

              <View style={styles.generalInfoContainer}>
                <IconWithLabel
                  icon={validAmountIcon}
                  label={`${productInformation?.remainingWeight} ${productInformation?.unit}`}
                />

                <IconWithLabel icon={suggestPriceIcon} label={`30.000 vnd`} />
              </View>

              <View style={styles.longLine} />
              {productInformation?.farmer && (
                <FarmerInfo farmer={productInformation.farmer} />
              )}

              <View style={styles.shortLine} />

              <Text style={styles.descriptionTitle}>{I18n.description}</Text>

              <Text style={styles.description}>
                What is a fruit? In a botanical sense, a fruit is the fleshy or
                dry ripened ovary of a flowering plant, enclosing the seed or
                seeds. Apricots, bananas, and grapes, as well as bean pods, corn
                grains, tomatoes, cucumbers, and (in their shells) acorns and
                almonds, are all technically fruits.
              </Text>

              <View style={styles.shortLine} />

              <Button
                buttonStyle={styles.orderButton}
                title={I18n.getNow}
                titleStyle={styles.buttonTitle}
                onPress={() => setShow(true)}
              />
            </ScrollView>
            <CustomBottomSheet
              visible={show}
              children={<InputInformation />}
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

const ImageShowing = ({imageSource}: {imageSource: ImageSourcePropType}) => {
  return (
    <View style={styles.imageProductContainer}>
      <View style={styles.productImage}>
        <Image source={imageSource} style={styles.pImage} />
      </View>
    </View>
  );
};

const FarmerInfo = ({farmer}: {farmer: Farmer}) => {
  return (
    <TouchableOpacity
      style={styles.farmerCard}
      onPress={() =>
        globalNavigate(ScreenName.StoreDetailScreen, {
          userId: farmer?.id,
        })
      }>
      <View style={styles.farmerImageContainer}>
        <Image source={getImage(farmer?.avatar)} style={styles.farmerImage} />
      </View>
      <View style={styles.farmerInformationContainer}>
        <Text style={styles.farmerName}>
          {farmer?.firstName + ' ' + farmer?.lastName}
        </Text>
        <Text style={styles.farmerLocation}>
          {getFarmerLocation(farmer?.location)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => callNumber(farmer?.phone)}>
        <Image source={phoneIcon} style={styles.contactIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() =>
          globalNavigate(ScreenName.MessageDetailScreen, {
            farmerId: farmer?.id,
          })
        }>
        <Image source={chatIcon} style={styles.contactIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
