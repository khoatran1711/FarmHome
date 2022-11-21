export const URL_SIGN_IN = 'signin';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
}
