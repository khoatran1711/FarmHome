export const AUTHENTICATION_STATE_NAME = 'authentication';

export interface AuthenticationState {
  id?: number | null;
  token: string | null;
  isLoading: boolean;
  deviceToken?: string | null;
}
