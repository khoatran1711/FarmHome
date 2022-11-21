import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {eyeIcon, hiddenIcon} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './change-password-style';

export const ChangePasswordScreen = () => {
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [newPass, setNewPass] = useState('');

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

  return (
    <View style={styles.container}>
      <GoBackButton />
      <Text style={styles.changePasswordTitle}>Change Password</Text>
      <Text style={styles.passwordRole}>
        Password must have at least 6 characters.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Old password</Text>
        <View style={styles.input}>
          <TextInput secureTextEntry={hideOldPass} style={styles.inputText} />
          <TouchableOpacity
            style={styles.hiddenIcon}
            onPress={() => setHideOldPass(!hideOldPass)}>
            <Image
              source={hideOldPass ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>New Password</Text>
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
              source={hideNewPass ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Confirm password</Text>
        <View style={styles.input}>
          <TextInput secureTextEntry={hideConfirm} style={styles.inputText} />
          <TouchableOpacity
            style={styles.hiddenIcon}
            onPress={() => setHideConfirm(!hideConfirm)}>
            <Image
              source={hideConfirm ? eyeIcon : hiddenIcon}
              resizeMode="contain"
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.securityStrength}>
        <View style={getPasswordStrength()}></View>
      </View>
    </View>
  );
};
