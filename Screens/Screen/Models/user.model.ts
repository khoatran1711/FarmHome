import {Location} from './farmer.model';

export const URL_GET_FARMER = 'user/id/';
export const URL_GET_PROFILE = 'user/profile';
export const URL_USER_UPDATE_PROFILE = 'admin/user/update';
export const URL_SIGN_UP = 'admin/user/create';
export const URL_CHANGE_PASSWORD = 'admin/user/changePassword';
export const URL_GET_LOCATION = 'location/user/';

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

export interface SignUpRequest {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  phone: string;
  status: {
    id: number;
  };
  roles: [
    {
      id: 3;
    },
  ];
  location: {
    address: string;
    ward: {
      id: number;
    };
  };
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
