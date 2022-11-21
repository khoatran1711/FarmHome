import {ToastAndroid} from 'react-native';
import {HttpStatusCode} from '../../../../Services/http-status-code';
import {HttpService} from '../../../../Services/http.services';
import {URL_BASE} from '../../../../Services/url.constant';
import {useRootSelector} from '../../../domain/hooks';
import {RootStore, RootStoreType} from '../../../domain/store';
import {
  LoginRequest,
  LoginResponse,
  URL_SIGN_IN,
} from '../../../Screen/Login-Screen/login.model';
import {handleBackendError} from '../../../utilities/handdle-error';
import {globalNavigate} from '../../../utilities/navigator-utilities';
import {AuthenticationSelectors} from '../authentication.selector';
import {AuthenticationActions} from '../authentication.state';

export class AuthenticationService {
  private httpService: HttpService;
  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  LogIn(username: string, password: string) {
    const urlRequest = URL_BASE + URL_SIGN_IN;
    const loginRequest = {
      username: username,
      password: password,
    };
    this.store.dispatch(AuthenticationActions.setLoading(true));
    return this.httpService
      .post<LoginRequest, LoginResponse>(urlRequest, loginRequest)
      .then(httpResult => {
        this.store.dispatch(
          AuthenticationActions.logIn(httpResult.data.accessToken),
        );

        this.store.dispatch(AuthenticationActions.setLoading(false));
        const status = httpResult.status;

        if (status === HttpStatusCode.Unauthorized) {
          ToastAndroid.show(
            'Vui lòng kiểm tra tài khoản hoặc mật khẩu!',
            ToastAndroid.SHORT,
          );
        }

        if (status === HttpStatusCode.Created) {
          ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
          globalNavigate('HomeScreen');
        }

        if (status === HttpStatusCode.NetWorkFail) {
          ToastAndroid.show(
            'Vui lòng kiểm tra lại kết nối!',
            ToastAndroid.SHORT,
          );
        }

        return {status};
      });
  }
}
