import {Location} from './farmer.model';

export const URL_GET_FARMER = 'user/id/';
export const URL_GET_PROFILE = 'user/profile';

export interface User {
  id: number;
  username: string;
  avatar: null;
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  phone: string;
  location: Location;
  createDate: string;
  status: {
    id: number;
    name: string;
  };
}

export interface UserUpdateInfoRequest {
  id: number;
  firstName: string;
  lastName: string;
  birthDay: string | Date;
  email: string;
  phone: string;
  status: {
    id: number;
  };
  location: {
    address: string;
    ward: {
      id: number;
    };
  };
}
