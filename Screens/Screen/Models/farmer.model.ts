export interface Farmer {
  id: number;
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  phone: string;
  location: Location;
  createDate: string | Date;
  status: {
    id: number;
    name: string;
  };
}

export interface Location {
  id: number;
  address: string;
  ward: Ward;
}

export interface Ward {
  id: number;
  name: string;
  district: District;
}

export interface District {
  id: number;
  name: string;
  province: Province;
}

export interface Province {
  id: number;
  name: string;
}
