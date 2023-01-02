import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import {eyeIcon, hiddenIcon} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {changePassword} from '../../services/user.service';
import {I18n} from '../../translation';
import {resetNavigation} from '../../utilities/navigator-utilities';
import {ValidateData} from '../Login-Screen/login-screen';
import {ChangePasswordRequest} from '../Models/user.model';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './change-password-style';

export const ChangePasswordScreen = () => {
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    let security = 0;
    if (newPass.length > 8) {
      security += 1;
      console.log('length');
    }
    if (/[A-Z]/.test(newPass)) {
      security += 1;
      console.log(security);
      console.log('upper');
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPass)) {
      security += 2;
      console.log(security);
      console.log('special');
    }
    console.log(security);
    if (security == 0) return styles.securityNone;
    if (security < 2) return styles.securityWeak;
    if (security < 4) return styles.securityNormal;
    return styles.securityStrong;
  };

  const checkValidate = () => {
    let validate: ValidateData = {
      isError: false,
      error: '',
    };

    if (newPass.length === 0 || newPass.length === 0) {
      validate.isError = true;
      validate.error = I18n.pleaseFillInPassword;
      return validate;
    }
    if (newPass.includes(' ') || newPass.includes(' ')) {
      validate.isError = true;
      validate.error = I18n.passwordDoesNotContainSpace;
      return validate;
    }
    if (newPass.length < 6 || newPass.length < 6) {
      validate.isError = true;
      validate.error = I18n.passwordMustHave6character;
      return validate;
    }
    if (newPass !== confirmPassword) {
      validate.isError = true;
      validate.error = I18n.newPasswordNotMatch;
      return validate;
    }

    let security = 0;
    if (newPass.length > 8) {
      security += 1;
    }
    if (/[A-Z]/.test(newPass)) {
      security += 1;
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPass)) {
      security += 2;
    }

    if (security < 2) {
      validate.isError = true;
      validate.error = I18n.passwordNotStrong;
      return validate;
    }

    validate.error = '';
    return validate;
  };

  const onChangePassword = () => {
    if (checkValidate()?.error) {
      Alert.alert(checkValidate()?.error);
    } else {
      change();
    }
  };

  const change = async () => {
    setLoading(true);
    const request: ChangePasswordRequest = {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmNewPassword: confirmPassword,
    };
    const response = await changePassword(request);
    const data = response?.data;
    console.log(data);
    if (response?.isSuccess) {
      ToastAndroid.show(I18n.updateSuccessfully, ToastAndroid.SHORT);
      resetNavigation('LoginScreen');
    } else {
      ToastAndroid.show(
        I18n.somethingWentWrongPleaseTryAgain,
        ToastAndroid.SHORT,
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <GoBackButton />
      <Text style={styles.changePasswordTitle}>{I18n.changePassword}</Text>
      <Text style={styles.passwordRole}>{I18n.passwordMustHave6character}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{I18n.oldPassword}</Text>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={hideOldPass}
            style={styles.inputText}
            onChangeText={e => setOldPass(e)}
          />
          <TouchableOpacity
            style={styles.hiddenIcon}
            onPress={() => setHideOldPass(!hideOldPass)}>
            <Image
              source={!hideOldPass ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{I18n.newPassword}</Text>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={hideNewPass}
            style={styles.inputText}
            onChangeText={value => setNewPass(value)}
          />
          <TouchableOpacity
            style={styles.hiddenIcon}
            onPress={() => setHideNewPass(!hideNewPass)}>
            <Image
              source={!hideNewPass ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{I18n.confirmPassword}</Text>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={hideConfirm}
            style={styles.inputText}
            onChangeText={e => setConfirmPassword(e)}
          />
          <TouchableOpacity
            style={styles.hiddenIcon}
            onPress={() => setHideConfirm(!hideConfirm)}>
            <Image
              source={!hideConfirm ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.securityStrength}>
        <View style={getPasswordStrength()}></View>
      </View>

      <TouchableOpacity
        style={{
          width: '50%',
          height: 40,
          backgroundColor: Colors.DarkGreen,
          marginTop: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        onPress={() => onChangePassword()}>
        <Text style={{fontSize: FontSize.Normal}}>{I18n.change}</Text>
      </TouchableOpacity>
      {loading ? <WaitingComponent /> : null}
    </View>
  );
};
