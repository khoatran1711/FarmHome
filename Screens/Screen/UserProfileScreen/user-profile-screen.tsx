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
import {getProfile, updateProfile} from '../../services/user.service';
import {User, UserUpdateInfoRequest} from '../Models/user.model';
import DatePicker from 'react-native-date-picker';
import {getImage} from '../../utilities/format-utilities';
import {globalGoBack} from '../../utilities/navigator-utilities';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {ToastAndroid} from 'react-native';

export const UserProfileScreen = () => {
  const [user, setUser] = useState<User>();
  const [filePath, setFilePath] = useState<any | undefined>();
  const [choosingImage, setChoosingImage] = useState<any>();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [wards, setWard] = useState('');
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
        value: item?.ward,
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
          id: 1,
        },
      },
    };

    console.log(user);

    const res = await updateProfile(requestSending, choosingImage);

    useEffect(() => {
      getData();
    }, []);
  };

  const getData = async () => {
    const response = await getProfile();
    // const request = await updateProfile();
    const data = response?.data;

    setUser(data);
    setFilePath({uri: data?.avatar});
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setPhone(user?.phone || '');
    setEmail(user?.email || '');
    setCity(user?.location?.ward?.district?.province?.name || '');
    setProvince(user?.location?.ward?.district?.name || '');
    setAddress(user?.location?.address || '');
    setId(user?.id || 0);
    setBirthDate(new Date(response?.data?.birthDay));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
          <ImageBackground
            source={filePath || defaultFarmer}
            style={styles.userBackground}>
            <View style={styles.background}>
              <GoBackButton />
              <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.welcomeTitle}>Welcome,</Text>
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
              <Text style={styles.inputTitle}>First Name</Text>
              <TextInput
                defaultValue={user?.firstName}
                style={styles.inputText}
                onChangeText={e => setFirstName(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Last Name</Text>
              <TextInput
                defaultValue={user?.lastName}
                style={styles.inputText}
                onChangeText={e => setLastName(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Phone</Text>
              <TextInput
                defaultValue={user?.phone}
                style={styles.inputText}
                onChangeText={e => setPhone(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                defaultValue={user?.email}
                style={styles.inputText}
                onChangeText={e => setEmail(e)}
              />
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Birth Date</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => setOpenDate(true)}>
                <Text style={styles.inputTitle}>
                  {birthDate?.toDateString() || user?.birthDay || ''}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Thành phố</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openCitySelect()}>
                <Text style={styles.inputTitle}>
                  {city ||
                    user?.location?.ward?.district?.province?.name ||
                    'Thành phố'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Quận / Tỉnh</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openProvinceSelect()}>
                <Text style={styles.inputTitle}>
                  {province ||
                    user?.location?.ward?.district?.name ||
                    'Quận / Tỉnh'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Phường</Text>
              <TouchableOpacity
                style={styles.addressInput}
                onPress={() => openWardSelect()}>
                <Text style={styles.inputTitle}>
                  {wards || user?.location?.ward?.name || 'Phường'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoInputContainer}>
              <Text style={styles.inputTitle}>Địa chỉ</Text>
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
                <Text style={styles.confirmTitle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => submitChange()}>
                <Text style={styles.confirmTitle}>Confirm</Text>
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
          }
          if (opening === 'districts') {
            setProvince(e?.name);
            setData([]);
            setOpening('');
            setIsOpen(false);
            setWard('');
          }
          if (opening === 'wards') {
            setWard(e?.name);
            setData([]);
            setOpening('');
            setIsOpen(false);
          }
        }}
        title="Thành phố"
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </View>
  );
};
