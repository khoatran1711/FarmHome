import React, {useMemo} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {HttpStatusCode} from '../../../Services/http-status-code';
import {
  backgroundLogin,
  backgroundSignup,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {useRootSelector} from '../../domain/hooks';
import {RootStore, RootStoreType} from '../../domain/store';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {AuthenticationActions} from '../../state/authentication/authentication.state';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {WaitingComponent} from '../ui/waiting-component/waiting.component';
import {style} from './login-style';
import {LoginRequest} from './login.model';
import {login} from './login.service';

const width = Dimensions.get('screen').width;

const switchTab = new Animated.Value(0);
let isLogin = true;

const status = switchTab.interpolate({
  inputRange: [0, width],
  outputRange: [6, 8],
});

export const LoginScreen = ({navigation}) => {
  const [isChooseLogin, setIsChooseLogin] = useState(true);

  const click = () => {
    isLogin = !isLogin;
    setIsChooseLogin(!isChooseLogin);
    return !isLogin
      ? Animated.timing(switchTab, {
          toValue: -width,
          duration: 800,
          useNativeDriver: false,
        }).start()
      : Animated.timing(switchTab, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }).start();
  };

  return (
    <View style={style.container}>
      <Animated.View
        style={[style.tabContainer, {width: width * 2, marginLeft: switchTab}]}>
        <LoginComponent navigation={navigation} />
        <SignUpComponent />
      </Animated.View>

      {/* <LoginComponent /> */}
      {/** Move to Sign up screen */}
      <View style={style.header}>
        <View style={style.headerContainer}>
          <View
            style={isChooseLogin ? style.signinStatus : style.signupStatus}
          />
          <View
            style={isChooseLogin ? style.signupStatus : style.signinStatus}
          />
        </View>
        <TouchableOpacity onPress={() => click()}>
          <Text style={style.switchTitle}>
            {isChooseLogin
              ? 'You dont have an account? Create now?'
              : 'You have an account already? Login now? '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUpComponent = () => {
  return (
    <View style={style.componentContainer}>
      <Image
        source={backgroundSignup}
        style={style.imageSignup}
        resizeMode={'contain'}
      />
      <ScrollView>
        <View style={style.inputContainer}>
          <Text style={style.loginTitle}>Create your new account</Text>
          <View style={style.input}>
            <Text style={style.inputTitle}>Username:</Text>
            <TextInput
              style={style.inputPlace}
              placeholderTextColor={Colors.DarkGreen80}
              placeholder="Username"
            />
          </View>

          <View style={style.input}>
            <Text style={style.inputTitle}>Username:</Text>
            <TextInput
              style={style.inputPlace}
              placeholderTextColor={Colors.DarkGreen80}
              placeholder="Username"
            />
          </View>

          <View style={style.input}>
            <Text style={style.inputTitle}>Username:</Text>
            <TextInput
              style={style.inputPlace}
              placeholderTextColor={Colors.DarkGreen80}
              placeholder="Username"
            />
          </View>

          <View style={style.input}>
            <Text style={style.inputTitle}>Username:</Text>
            <TextInput
              style={style.inputPlace}
              placeholderTextColor={Colors.DarkGreen80}
              placeholder="Username"
            />
          </View>

          <View style={style.input}>
            <Text style={style.inputTitle}>Username:</Text>
            <TextInput
              style={style.inputPlace}
              placeholderTextColor={Colors.DarkGreen80}
              placeholder="Username"
            />
          </View>

          {/** Login button */}
          <View style={style.button}>
            <TouchableOpacity style={style.buttonContainer}>
              <Text style={style.buttonTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface ValidateData {
  isError: boolean;
  error: string;
}

const LoginComponent = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkValidateLogin = () => {
    let validate: ValidateData = {
      isError: false,
      error: '',
    };

    if (username.length === 0 || password.length === 0) {
      validate.isError = true;
      validate.error = 'Vui lòng điền đủ thông tin';
      return validate;
    }
    if (username.includes(' ') || password.includes(' ')) {
      validate.isError = true;
      validate.error = 'Mật khẩu hoặc tài khoản không được chứa dấu cách';
      return validate;
    }
    if (username.length < 6 || password.length < 6) {
      validate.isError = true;
      validate.error = 'Mật khẩu hoặc tài khoản không hợp lệ';
      return validate;
    }
    validate.isError = false;
    validate.error = '';
    return validate;
  };

  const loadData = () => {
    const validate: ValidateData = checkValidateLogin();
    if (validate.isError) {
      Alert.alert(validate.error);
    } else {
      new AuthenticationService().LogIn(username, password);
    }
  };

  const loading = useRootSelector(AuthenticationSelectors.isLoadingSelector);

  return (
    <View style={style.componentContainer}>
      {loading ? <WaitingComponent /> : <></>}
      <Image
        source={backgroundLogin}
        style={style.imageLogin}
        resizeMode={'contain'}
      />
      <View style={style.inputContainer}>
        <Text style={style.loginTitle}>Login</Text>

        {/** Input username */}
        <View style={style.input}>
          <Text style={style.inputTitle}>Username:</Text>
          <TextInput
            style={style.inputPlace}
            onChangeText={value => setUsername(value)}
            placeholderTextColor={Colors.DarkGreen80}
            placeholder="Username"
          />
        </View>

        {/** Input password */}
        <View style={style.input}>
          <Text style={style.inputTitle}>Password:</Text>
          <TextInput
            style={style.inputPlace}
            onChangeText={value => setPassword(value)}
            placeholderTextColor={Colors.DarkGreen80}
            placeholder="Password"
          />
        </View>

        {/** Forgot password button */}
        {/* <TouchableOpacity>
      <Text>Forgot password</Text>
    </TouchableOpacity> */}

        {/** Login button */}
        <View style={style.button}>
          <TouchableOpacity
            style={style.buttonContainer}
            onPress={() => loadData()}>
            <Text style={style.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
