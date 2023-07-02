import React from 'react';
import {useState} from 'react';
import {Alert, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import {View, Text} from 'react-native';
import {backgroundLogin} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {ScreenName} from '../../constants/screen-name.constant';
import {useRootSelector} from '../../domain/hooks';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {I18n} from '../../translation';
import {PopupShow} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {Button} from '../ui/button';
import {InputWrapper} from '../ui/input-wrapper';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {styles} from './login-style';

export const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loading = useRootSelector(AuthenticationSelectors.isLoadingSelector);
  const deviceId = useRootSelector(AuthenticationSelectors.deviceTokenSelector);

  const checkValidateLogin = () => {
    let validate: ValidateData = {
      isError: false,
      error: '',
    };

    if (username.length === 0 || password.length === 0) {
      validate.isError = true;
      validate.error = I18n.pleaseFillAllInformation;
      return validate;
    }
    if (username.includes(' ') || password.includes(' ')) {
      validate.isError = true;
      validate.error = I18n.passwordDoesNotContainSpace;
      return validate;
    }

    validate.isError = false;
    validate.error = '';
    return validate;
  };

  const loadData = () => {
    const validate: ValidateData = checkValidateLogin();
    if (validate.isError) {
      PopupShow(I18n.fail, validate.error);
    } else {
      new AuthenticationService().LogIn(username, password, deviceId);
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          {loading ? <WaitingComponent /> : <></>}
          <ScrollView>
            <Image
              source={backgroundLogin}
              resizeMode={'contain'}
              style={styles.banner}
            />

            <Text style={styles.farmhomeTitle}>FARMHOME</Text>

            <InputWrapper
              label={I18n.username}
              wrapperStyle={styles.inputWrapper}
              onTextChange={value => setUsername(value)}
            />
            <InputWrapper
              label={I18n.password}
              wrapperStyle={styles.inputWrapper}
              isHidden={true}
              onTextChange={value => setPassword(value)}
            />
            <Button
              buttonStyle={styles.loginButton}
              titleStyle={{color: Colors.TimberGreen}}
              title={I18n.login}
              onPress={() => loadData()}
            />
            <Button
              buttonStyle={styles.signupButton}
              title={I18n.signUp}
              onPress={() => globalNavigate(ScreenName.SignUpScreen)}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export interface ValidateData {
  isError: boolean;
  error: string;
}
