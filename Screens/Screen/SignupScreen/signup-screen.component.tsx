import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  backgroundLogin,
  backgroundSignup,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {useRootSelector} from '../../domain/hooks';
import {UserService} from '../../services/user.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {I18n} from '../../translation';
import common from '../../translation/en/common';
import {places} from '../../utilities/constant-utilities';
import {convertDateToString} from '../../utilities/help-utilities';
import {
  globalGoBack,
  resetNavigation,
} from '../../utilities/navigator-utilities';
import {SignUpRequest} from '../Models/user.model';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {style} from './signup-screen.style';

export const SignUpScreenComponent = () => {
  const {t} = useTranslation();
  const userService = new UserService();
  const [openDate, setOpenDate] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [opening, setOpening] = useState('');
  const [data, setData] = useState<any[]>();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [wards, setWard] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [wardsValue, setWardValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const openCitySelect = () => {
    const cities = places?.map(item => {
      return {
        value: item?.province_code,
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
        value: item?.district_code,
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

  const Submit = async () => {
    if (
      !username ||
      username === '' ||
      !password ||
      password === '' ||
      !confirmPassword ||
      confirmPassword === '' ||
      firstName === '' ||
      !firstName ||
      !lastName ||
      lastName === '' ||
      !email ||
      email === '' ||
      !phone ||
      phone === '' ||
      cityValue === '' ||
      provinceValue === '' ||
      wardsValue === '' ||
      !address ||
      address === ''
    ) {
      Alert.alert('Vui lòng kiểm tra lại thông tin');
    } else {
      const req: SignUpRequest = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        birthDay: convertDateToString(birthDate),
        email: email,
        phone: phone,
        status: {
          id: 1,
        },
        roles: [
          {
            id: 3,
          },
        ],
        location: {
          address: address,
          ward: {
            id: Number(wardsValue),
          },
        },
      };
      setLoading(true);
      const response = await userService.signUp(req);
      if (response.isSuccess) {
        Alert.alert('Đăng ký thành công!');
        globalGoBack();
      } else {
        Alert.alert('Đã xảy ra lỗi, xin hãy thử lại');
      }
      setLoading(false);
    }
  };

  return (
    <View style={style.componentContainer}>
      {loading ? (
        <WaitingComponent />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <Image
            source={backgroundSignup}
            style={style.imageSignup}
            resizeMode={'contain'}
          />
          <View style={style.inputContainer}>
            <Text style={style.loginTitle}>{I18n.createNewAccount}</Text>
            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.username}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.username}
                onChangeText={e => setUsername(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.password}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.password}
                onChangeText={e => setPassword(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.confirmPassword}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.confirmPassword}
                onChangeText={e => setConfirmPassword(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.firstName}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.firstName}
                onChangeText={e => setFirstName(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.lastName}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.lastName}
                onChangeText={e => setLastName(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.email}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.email}
                onChangeText={e => setEmail(e)}
              />
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.phoneNumber}:</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.phoneNumber}
                onChangeText={e => setPhone(e)}
              />
            </View>

            <View style={style.infoInputContainer}>
              <Text style={style.inputTitle}>{I18n.birthdate}</Text>
              <TouchableOpacity
                style={style.addressInput}
                onPress={() => setOpenDate(true)}>
                <Text style={style.switchTitle}>
                  {birthDate?.toDateString() || ''}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style.infoInputContainer}>
              <Text style={style.inputTitle}>{I18n.city}</Text>
              <TouchableOpacity
                style={style.addressInput}
                onPress={() => openCitySelect()}>
                <Text style={style.switchTitle}>{city || I18n.city}</Text>
              </TouchableOpacity>
            </View>

            <View style={style.infoInputContainer}>
              <Text style={style.inputTitle}>{I18n.district}</Text>
              <TouchableOpacity
                style={style.addressInput}
                onPress={() => openProvinceSelect()}>
                <Text style={style.switchTitle}>
                  {province || I18n.district}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style.infoInputContainer}>
              <Text style={style.inputTitle}>{I18n.ward}</Text>
              <TouchableOpacity
                style={style.addressInput}
                onPress={() => openWardSelect()}>
                <Text style={style.switchTitle}>{wards || I18n.ward}</Text>
              </TouchableOpacity>
            </View>

            <View style={style.input}>
              <Text style={style.inputTitle}>{I18n.address}</Text>
              <TextInput
                style={style.inputPlace}
                placeholderTextColor={Colors.DarkGreen80}
                placeholder={I18n.address}
                onChangeText={e => setAddress(e)}
              />
            </View>

            {/** Login button */}
            <View style={style.button}>
              <TouchableOpacity
                style={style.buttonContainer}
                onPress={() => Submit()}>
                <Text style={style.buttonTitle}>{I18n.signUp}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={style.switchButton}
              onPress={() => resetNavigation('LoginScreen')}>
              <Text style={[style.switchTitle, {textAlign: 'center'}]}>
                {I18n.alreadyHaveAccountLoginNow}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
            setCityValue(e?.value);
            setData([]);
            setOpening('');
            setIsOpen(false);
            setProvince('');
            setWard('');
          }
          if (opening === 'districts') {
            setProvince(e?.name);
            setProvinceValue(e?.value);
            setData([]);
            setOpening('');
            setIsOpen(false);
            setWard('');
          }
          if (opening === 'wards') {
            setWard(e?.name);
            setWardValue(e?.value);
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

export interface ValidateData {
  isError: boolean;
  error: string;
}
