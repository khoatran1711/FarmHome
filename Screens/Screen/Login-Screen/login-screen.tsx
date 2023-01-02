import React, {useMemo} from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
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
import DatePicker from 'react-native-date-picker';
import {HttpStatusCode} from '../../../Services/http-status-code';
import {
  backgroundLogin,
  backgroundSignup,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {useRootSelector} from '../../domain/hooks';
import {RootStore, RootStoreType} from '../../domain/store';
import {signUp} from '../../services/user.service';
import {AuthenticationSelectors} from '../../state/authentication/authentication.selector';
import {AuthenticationActions} from '../../state/authentication/authentication.state';
import {AuthenticationService} from '../../state/authentication/services/authentication.service';
import {I18n} from '../../translation';
import {places} from '../../utilities/constant-utilities';
import {convertDateToString} from '../../utilities/help-utilities';
import {globalNavigate} from '../../utilities/navigator-utilities';
import {SignUpRequest} from '../Models/user.model';
import {SelectingScreenComponent} from '../ui/selecting-screen-component/selecting-screen.component';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    if (username.length < 6 || password.length < 6) {
      validate.isError = true;
      validate.error = I18n.passwordOrUsernameIsNotValid;
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
        <Text style={style.loginTitle}>{I18n.login}</Text>

        {/** Input username */}
        <View style={style.input}>
          <Text style={style.inputTitle}>{I18n.username}</Text>
          <TextInput
            style={style.inputPlace}
            onChangeText={value => setUsername(value)}
            placeholderTextColor={Colors.DarkGreen80}
            placeholder={I18n.username}
          />
        </View>

        {/** Input password */}
        <View style={style.input}>
          <Text style={style.inputTitle}>{I18n.password}:</Text>
          <TextInput
            style={style.inputPlace}
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
            placeholderTextColor={Colors.DarkGreen80}
            placeholder={I18n.password}
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
            <Text style={style.buttonTitle}>{I18n.login}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => globalNavigate('Signup')}>
          <Text style={[style.switchTitle, {textAlign: 'center'}]}>
            {I18n.dontHaveAccountCreateNow}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export interface ValidateData {
  isError: boolean;
  error: string;
}
