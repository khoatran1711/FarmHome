import React, {useEffect, useState} from 'react';
import {Modal, ScrollView} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  banner,
  banner1,
  cameraIcon,
  defaultFarmer,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './user-profile.style';
import * as ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
import {places} from '../../utilities/constant-utilities';
import {UserService} from '../../services/user.service';
import {User, UserUpdateInfoRequest} from '../Models/user.model';
import DatePicker from 'react-native-date-picker';
import {getImage} from '../../utilities/format-utilities';
import {globalGoBack} from '../../utilities/navigator-utilities';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {useRootSelector} from '../../domain/hooks';
import {I18n} from '../../translation';
import {InputWrapper} from '../ui/input-wrapper';
import {InputButtonWrapper} from '../ui/input-button-wrapper';
import {Button} from '../ui/button';
import {getImageFarmer} from '../../utilities/help-utilities';

export const UserProfileScreen = () => {
  const userService = new UserService();
  const token = useRootSelector(AuthenticationSelectors.tokenSelector);
  const [user, setUser] = useState<User>();
  const [filePath, setFilePath] = useState<any | undefined>();
  const [choosingImage, setChoosingImage] = useState<any>();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [wards, setWard] = useState('');
  const [wardsCode, setWardCode] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [opening, setOpening] = useState('');
  const [data, setData] = useState<any[]>();
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

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
    const districts = cities?.find(item => item?.district === province)?.wards;
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

  const chooseFile = () => {
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
    ImagePicker.launchImageLibrary(options as any, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        //let source = response;
        // You can also display the  image using data:

        if (response && response?.assets && response?.assets[0]) {
          setFilePath({uri: response?.assets[0]?.uri});
          setChoosingImage(response?.assets[0]);
        }
      }
    });
  };

  const getMonth = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };
  const submitChange = async () => {
    const requestSending: UserUpdateInfoRequest = {
      id: user?.id || 0,
      firstName: firstName || '',
      lastName: lastName || '',
      birthDay:
        birthDate?.getFullYear() +
          '-' +
          getMonth(birthDate?.getMonth() + 1) +
          '-' +
          getMonth(birthDate?.getUTCDate()) || new Date(),
      email: email,
      phone: phone,
      status: {
        id: 1,
      },
      location: {
        address: address,
        ward: {
          id: Number(wardsCode),
        },
      },
    };

    console.log('======== REQUEST ', requestSending);

    setLoading(true);
    const res = await userService.updateProfile(requestSending, choosingImage);
    setLoading(false);
    getData();
  };

  const getData = async () => {
    const response = await userService.getProfile();
    const data = response?.data;

    setUser(data);
    setFilePath({uri: data?.avatar});
    setFirstName(data?.firstName || '');
    setLastName(data?.lastName || '');
    setPhone(data?.phone || '');
    setEmail(data?.email || '');
    setCity(data?.location?.ward?.district?.province?.name || '');
    setProvince(data?.location?.ward?.district?.name || '');
    setAddress(data?.location?.address || '');
    setId(data?.id || 0);
    setBirthDate(new Date(response?.data?.birthDay));
    setWard(data?.location?.ward?.name);
    setWardCode(data?.location?.ward?.id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {user && !loading ? (
          <>
            <ScrollView>
              <GoBackButton />
              <View
                style={{
                  width: 200,
                  height: 200,
                  borderColor: Colors.Solitaire,
                  borderWidth: 1,
                  borderRadius: 200,
                  alignSelf: 'center',
                }}
              />
              <ImageBackground
                source={filePath || defaultFarmer}
                resizeMode={'stretch'}
                borderRadius={220}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: -190,
                  marginLeft: 30,
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: Colors.Finlandia,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => chooseFile()}>
                  <Image
                    source={cameraIcon}
                    style={{width: 20, height: 20, resizeMode: 'stretch'}}
                  />
                </TouchableOpacity>
              </ImageBackground>

              <Text
                style={{
                  color: Colors.Solitaire,
                  fontSize: FontSize.MediumLarge,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {I18n.welcome}, {user?.firstName + ' ' + user?.lastName}
              </Text>

              <InputWrapper
                label={I18n.firstName}
                wrapperStyle={styles.wrapperContainer}
                onTextChange={e => setFirstName(e)}
                value={firstName}
              />
              <InputWrapper
                label={I18n.lastName}
                wrapperStyle={styles.wrapperContainer}
                onTextChange={e => setLastName(e)}
                value={lastName}
              />
              <InputWrapper
                label={I18n.email}
                wrapperStyle={styles.wrapperContainer}
                onTextChange={e => setEmail(e)}
                value={email}
              />
              <InputWrapper
                label={I18n.phoneNumber}
                wrapperStyle={styles.wrapperContainer}
                onTextChange={e => setPhone(e)}
                numberOnly={true}
                value={phone}
              />
              <InputButtonWrapper
                label={I18n.birthdate}
                wrapperStyle={styles.wrapperContainer}
                content={birthDate.toDateString()}
                onPress={() => setOpenDate(true)}
              />
              <InputButtonWrapper
                label={I18n.city}
                wrapperStyle={styles.wrapperContainer}
                content={city}
                onPress={() => openCitySelect()}
              />
              <InputButtonWrapper
                label={I18n.district}
                wrapperStyle={styles.wrapperContainer}
                content={province}
                onPress={() => openProvinceSelect()}
              />
              <InputButtonWrapper
                label={I18n.ward}
                wrapperStyle={styles.wrapperContainer}
                content={wards}
                onPress={() => openWardSelect()}
              />
              <InputWrapper
                label={I18n.address}
                wrapperStyle={styles.wrapperContainer}
                onTextChange={e => setAddress(e)}
                value={address}
              />

              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                <Button
                  buttonStyle={styles.cancelButton}
                  titleStyle={{color: Colors.Solitaire}}
                  title={I18n.cancel}
                  onPress={() => globalGoBack()}
                />

                <Button
                  buttonStyle={styles.confirmButton}
                  titleStyle={{color: Colors.TimberGreen}}
                  title={I18n.confirm}
                  onPress={() => submitChange()}
                />
              </View>
            </ScrollView>
            <DatePicker
              modal
              mode={'date'}
              open={openDate}
              date={new Date()}
              onConfirm={date => {
                setOpenDate(false);
                setBirthDate(date);
              }}
              onCancel={() => {
                setOpenDate(false);
              }}
            />
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
                  setWardCode(0);
                }
                if (opening === 'districts') {
                  setProvince(e?.name);
                  setData([]);
                  setOpening('');
                  setIsOpen(false);
                  setWard('');
                  setWardCode(0);
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
          </>
        ) : (
          <WaitingComponent />
        )}
      </View>
    </>
  );
};
