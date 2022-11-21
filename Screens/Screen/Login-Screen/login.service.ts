import {HttpResult, HttpService} from '../../../Services/http.services';
import {URL_BASE} from '../../../Services/url.constant';
import {LoginRequest, LoginResponse, URL_SIGN_IN} from './login.model';

var httpService = new HttpService();

export const login = (
  loginRequest: LoginRequest,
): Promise<HttpResult<LoginResponse>> => {
  const url = URL_BASE + URL_SIGN_IN;

  return httpService.post<LoginRequest, LoginResponse>(url, loginRequest);
};
