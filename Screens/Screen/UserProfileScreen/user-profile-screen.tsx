import React, {useEffect, useState} from 'react';
import {Button, Modal, ScrollView} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {banner1, defaultFarmer} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './user-profile-style';
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
import {ToastAndroid} from 'react-native';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {useRootSelector} from '../../domain/hooks';
import {I18n} from '../../translation';

export const UserProfileScreen = () => {
  const userService = new UserService();
  const token = useRootSelector(AuthenticationSelectors.tokenSelector);
  const [user, setUser] = useState<User>();
  const [filePath, setFilePath] = useState<any | undefined>();
  const [choosingImage, setChoosingImage] = useState<any>();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [wards, setWard] = useState('');
  const [wardsCode, setWardCode] = useState('');
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
    console.log(data);

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
    setWardCode(data?.location?.ward?.id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {user && !loading ? (
        <ScrollView>
          <ImageBackground
            source={filePath || defaultFarmer}
            style={styles.userBackground}>
            <View style={styles.background}>
              <GoBackButton />
              <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.welcomeTitle}>{I18n.welcome},</Text>
                  <Text style={styles.welcomeName}>
                    {user?.firstName + ' ' + user?.lastName}
                  </Text>
                </View>
                <View style={styles.userImageContainer}>
                  <View style={styles.userImage}>
                    <Image
                      source={filePath || defaultFarmer}
                      style={styles.cameraIcon}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => chooseFile()}
                    style={styles.changeImageBtn}></TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.infoContainer}>
            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.firstName}</Text>
              <TextInput
                defaultValue={user?.firstName}
                style={styles.inputText}
                onChangeText={e => {
                  setFirstName(e);
                }}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.lastName}</Text>
              <TextInput
                defaultValue={user?.lastName}
                style={styles.inputText}
                onChangeText={e => setLastName(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.phoneNumber}</Text>
              <TextInput
                defaultValue={user?.phone}
                style={styles.inputText}
                onChangeText={e => setPhone(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.email}</Text>
              <TextInput
                defaultValue={user?.email}
                style={styles.inputText}
                onChangeText={e => setEmail(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.birthdate}</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => setOpenDate(true)}>
                <Text style={styles.inputTitle}>
                  {birthDate?.toDateString() || user?.birthDay || ''}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.city}</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openCitySelect()}>
                <Text style={styles.inputTitle}>
                  {city ||
                    user?.location?.ward?.district?.province?.name ||
                    I18n.city}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.district}</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openProvinceSelect()}>
                <Text style={styles.inputTitle}>
                  {province ||
                    user?.location?.ward?.district?.name ||
                    I18n.district}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.ward}</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openWardSelect()}>
                <Text style={styles.inputTitle}>
                  {wards || user?.location?.ward?.name || I18n.ward}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>{I18n.address}</Text>
              <TextInput
                style={styles.inputText}
                defaultValue={user?.location?.address}
                onChangeText={e => setAddress(e)}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => globalGoBack()}>
                <Text style={styles.confirmTitle}>{I18n.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => submitChange()}>
                <Text style={styles.confirmTitle}>{I18n.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <WaitingComponent />
      )}

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
    </View>
  );
};
