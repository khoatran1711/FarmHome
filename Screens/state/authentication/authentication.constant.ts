export const AUTHENTICATION_STATE_NAME = 'authentication';

export interface AuthenticationState {
  token: string | null;
  isLoading: boolean;
}
