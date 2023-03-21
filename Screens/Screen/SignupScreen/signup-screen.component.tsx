import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, ScrollView, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {backgroundSignup} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {UserService} from '../../services/user.service';
import {I18n} from '../../translation';
import {places} from '../../utilities/constant-utilities';
import {convertDateToString} from '../../utilities/help-utilities';
import {
  globalGoBack,
  resetNavigation,
} from '../../utilities/navigator-utilities';
import {SignUpRequest} from '../Models/user.model';
import {Button} from '../ui/button';
import {InputButtonWrapper} from '../ui/input-button-wrapper/input-button-wrapper.component';
import {InputWrapper} from '../ui/input-wrapper';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './signup-screen.style';

export const SignUpScreenComponent = () => {
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
        birthDay: convertDateToString(birthDate) || '',
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
    <View style={styles.container}>
      {loading ? <WaitingComponent /> : <></>}
      <ScrollView>
        <Image
          source={backgroundSignup}
          resizeMode={'contain'}
          style={styles.imageSignup}
        />

        <InputWrapper
          label={I18n.firstName}
          wrapperStyle={styles.wrapperContainer}
          onTextChange={e => setFirstName(e)}
        />
        <InputWrapper
          label={I18n.lastName}
          wrapperStyle={styles.wrapperContainer}
          onTextChange={e => setLastName(e)}
        />
        <InputWrapper
          label={I18n.username}
          wrapperStyle={styles.wrapperContainer}
          onTextChange={e => setUsername(e)}
        />
        <InputWrapper
          label={I18n.password}
          wrapperStyle={styles.wrapperContainer}
          isHidden={true}
          onTextChange={e => setPassword(e)}
        />
        <InputWrapper
          label={I18n.confirmPassword}
          wrapperStyle={styles.wrapperContainer}
          isHidden={true}
          onTextChange={e => setConfirmPassword(e)}
        />
        <InputWrapper
          label={I18n.email}
          wrapperStyle={styles.wrapperContainer}
          onTextChange={e => setEmail(e)}
        />
        <InputWrapper
          label={I18n.phoneNumber}
          wrapperStyle={styles.wrapperContainer}
          onTextChange={e => setPhone(e)}
          numberOnly={true}
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
        />

        <Button
          buttonStyle={styles.signupButton}
          titleStyle={{color: Colors.TimberGreen}}
          title={I18n.signUp}
          onPress={() => Submit()}
        />
        <Button
          buttonStyle={styles.loginButton}
          title={I18n.login}
          onPress={() => resetNavigation(ScreenName.LoginScreen)}
        />
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
        title={
          opening === 'city'
            ? I18n.city
            : opening === 'districts'
            ? I18n.district
            : I18n.ward
        }
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
