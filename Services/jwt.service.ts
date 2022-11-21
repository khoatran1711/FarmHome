import jwtDecode, {JwtPayload} from 'jwt-decode';

export class JwtService {
  /**
   * Decode JWT
   *
   * @param {string} jwt
   * @returns JWT content
   * @memberof JwtService
   */
  decode(jwt: string) {
    return jwtDecode<JwtPayload>(jwt);
  }

  /**
   * Validate JWT
   *
   * @param {string} jwt
   * @returns Is JWT valid
   * @memberof JwtService
   */
  validate(jwt: string) {
    const payload = this.decode(jwt);

    if (!payload?.exp) {
      return;
    }

    const expireTime = payload.exp * 1000;
    const expireAt = new Date(expireTime);
    const now = new Date();

    return expireAt > now;
  }
}
