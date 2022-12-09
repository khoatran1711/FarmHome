import {ToastAndroid} from 'react-native';
import {HttpResult, HttpService} from '../../Services/http.services';
import {
  APPLICATION_JSON,
  AUTHORIZATION_BEARER,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE,
  URL_BASE,
} from '../../Services/url.constant';
import {RootStore, RootStoreType} from '../domain/store';
import {
  URL_GET_FARMER,
  URL_GET_PROFILE,
  User,
  UserUpdateInfoRequest,
} from '../Screen/Models/user.model';
import {AuthenticationSelectors} from '../state/authentication/authentication.selector';

const store: RootStoreType = RootStore;

const token = AuthenticationSelectors.tokenSelector(store.getState());
var httpService = new HttpService({
  [CONTENT_TYPE]: APPLICATION_JSON,
  [AUTHORIZATION_HEADER]: `${AUTHORIZATION_BEARER} ${token}`,
});

export const getUserById = (id: number): Promise<HttpResult<User>> => {
  const url = URL_BASE + URL_GET_FARMER + id;

  return httpService.get<User>(url);
};

export const getProfile = (): Promise<HttpResult<User>> => {
  const url = URL_BASE + URL_GET_PROFILE;

  return httpService.get<User>(url);
};

export const updateProfile = (req: UserUpdateInfoRequest, image: any) => {
  const url = URL_BASE + 'admin/user/update';

  var bodyFormData = new FormData();

  bodyFormData.append('user', JSON.stringify(req));

  bodyFormData.append('avatar', {
    uri: image?.uri,
    type: image?.type,
    name: image?.fileName,
  });

  return httpService
    .put(url, bodyFormData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
    .then(reponse => {
      console.log('my', reponse);
      reponse?.isSuccess
        ? ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT)
        : ToastAndroid.show(
            'Đã xảy ra lỗi, vui lòng kiểm tra lại',
            ToastAndroid.SHORT,
          );
    });
};
