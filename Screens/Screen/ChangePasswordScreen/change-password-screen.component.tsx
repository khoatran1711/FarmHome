import React, {useState} from 'react';
import {Text, View, Alert, ToastAndroid} from 'react-native';
import {HttpStatusCode} from '../../../Services/http-status-code';
import {eyeIcon, hiddenIcon} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {UserService} from '../../services/user.service';
import {I18n} from '../../translation';
import {
  globalGoBack,
  resetNavigation,
} from '../../utilities/navigator-utilities';
import {ValidateData} from '../Login-Screen/login-screen';
import {ChangePasswordRequest} from '../Models/user.model';
import {Button} from '../ui/button';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {HeaderTitle} from '../ui/header-title';
import {InputWrapper} from '../ui/input-wrapper';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './change-password-screen.style';

export const ChangePasswordScreen = () => {
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userService = new UserService();

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
    const response = await userService.changePassword(request);
    const data = response?.data;
    console.log(response);
    if (response?.isSuccess) {
      ToastAndroid.show(I18n.updateSuccessfully, ToastAndroid.SHORT);
      resetNavigation('LoginScreen');
    } else {
      response?.status === HttpStatusCode.BadRequest
        ? ToastAndroid.show(I18n.incorrectOldPassword, ToastAndroid.SHORT)
        : ToastAndroid.show(
            I18n.somethingWentWrongPleaseTryAgain,
            ToastAndroid.SHORT,
          );
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <GoBackButton />
        <HeaderTitle title={I18n.changePassword.toUpperCase()} />

        <InputWrapper
          wrapperStyle={styles.inputWrapper}
          label={I18n.oldPassword}
          isHidden={hideOldPass}
          icon={hideOldPass ? hiddenIcon : eyeIcon}
          onIconPress={() => setHideOldPass(!hideOldPass)}
          onTextChange={e => setOldPass(e)}
        />

        <InputWrapper
          wrapperStyle={styles.inputWrapper}
          label={I18n.newPassword}
          isHidden={hideNewPass}
          icon={hideNewPass ? hiddenIcon : eyeIcon}
          onIconPress={() => setHideNewPass(!hideNewPass)}
          onTextChange={e => setNewPass(e)}
        />

        <InputWrapper
          wrapperStyle={styles.inputWrapper}
          label={I18n.confirmPassword}
          isHidden={hideConfirm}
          icon={hideConfirm ? hiddenIcon : eyeIcon}
          onIconPress={() => setHideConfirm(!hideConfirm)}
          onTextChange={e => setConfirmPassword(e)}
        />

        <View style={styles.securityStrength}>
          <View style={getPasswordStrength()}></View>
        </View>

        <Text style={styles.noteTitle}>{I18n.note}</Text>
        <Text style={styles.noteContent}>{I18n.changePasswordNote}</Text>

        <View style={styles.buttonContainer}>
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
            onPress={() => onChangePassword()}
          />
        </View>
      </View>
      {loading ? <WaitingComponent /> : null}
    </>
  );
};
