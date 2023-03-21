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
import {GetNewsResponse, URL_GET_NEWS} from '../Screen/Models/news.model';
import {User} from '../Screen/Models/user.model';
import {AuthenticationSelectors} from '../state/authentication/authentication.selector';
import {globalGoBack} from '../utilities/navigator-utilities';

export class NewsService {
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

  getAllNews(): Promise<HttpResult<GetNewsResponse>> {
    const url = URL_BASE + URL_GET_NEWS;

    return this.httpService.get<any>(url);
  }
}
