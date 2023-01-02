import FormData from 'form-data';
import {ToastAndroid} from 'react-native';
import {HttpResult, HttpService} from '../../Services/http.services';
import {
  ACCEPT,
  APPLICATION_JSON,
  AUTHORIZATION_BEARER,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE,
  MULTIPART_FORM_DATA,
  URL_BASE,
} from '../../Services/url.constant';
import {useRootSelector} from '../domain/hooks';
import {RootStore, RootStoreType} from '../domain/store';
import {
  ChangePasswordRequest,
  SignUpRequest,
  URL_CHANGE_PASSWORD,
  URL_GET_FARMER,
  URL_GET_LOCATION,
  URL_GET_PROFILE,
  URL_SIGN_UP,
  URL_USER_UPDATE_PROFILE,
  User,
  UserUpdateInfoRequest,
} from '../Screen/Models/user.model';
import {AuthenticationSelectors} from '../state/authentication/authentication.selector';
import {globalGoBack} from '../utilities/navigator-utilities';

export class UserService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    const token = AuthenticationSelectors.tokenSelector(this.store.getState());
    if (token) {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
        [AUTHORIZATION_HEADER]: `${AUTHORIZATION_BEARER} ${token}`,
      });
    } else {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
      });
    }
  }

  getUserById(id: number): Promise<HttpResult<User>> {
    const url = URL_BASE + URL_GET_FARMER + id;

    return this.httpService.get<User>(url);
  }

  getProfile(): Promise<HttpResult<User>> {
    const url = URL_BASE + URL_GET_PROFILE;

    return this.httpService.get<User>(url);
  }

  signUp(req: SignUpRequest) {
    const url = URL_BASE + URL_SIGN_UP;

    var bodyFormData = new FormData();

    bodyFormData.append('user', JSON.stringify(req));

    return this.httpService.post<any, any>(url, bodyFormData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
  }

  updateProfile(req: UserUpdateInfoRequest, image: any) {
    const url = URL_BASE + URL_USER_UPDATE_PROFILE;

    var bodyFormData = new FormData();

    bodyFormData.append('user', JSON.stringify(req));

    image &&
      bodyFormData.append('avatar', {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });

    const check = new HttpService({
      [ACCEPT]: '*/*',
      [CONTENT_TYPE]:
        MULTIPART_FORM_DATA + `; boundary=${bodyFormData._boundary}`,
    });

    return check.put<any, any>(url, bodyFormData).then(response => {
      response?.isSuccess
        ? (ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT),
          globalGoBack())
        : (ToastAndroid.show(
            'Đã xảy ra lỗi, vui lòng kiểm tra lại',
            ToastAndroid.SHORT,
          ),
          console.log(response));
    });
  }

  changePassword(req: ChangePasswordRequest) {
    const url = URL_BASE + URL_CHANGE_PASSWORD;

    return this.httpService.put<any, any>(url, req);
  }

  getLocation(id: string) {
    const url = URL_BASE + URL_GET_LOCATION + id;

    return this.httpService.get<any>(url);
  }
}
