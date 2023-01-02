import {Linking} from 'react-native';
import {defaultFarmer} from '../constants/assets.constants';
import {Location} from '../Screen/Models/farmer.model';

export const callNumber = (phone: string | undefined) => {
  if (phone) {
    let phoneNumber = phone;

    phoneNumber = `tel:${phone}`;
    console.log(phoneNumber);

    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
        } else {
          Linking.openURL(phoneNumber).then();
        }
      })
      .catch(err => console.log(err));
  }
};

export const getFarmerLocation = (location: Location | undefined) => {
  if (location) {
    return (
      location?.address +
      ' ' +
      location?.ward?.name +
      ' ' +
      ', ' +
      location?.ward?.district?.name +
      ', ' +
      location?.ward?.district?.province?.name
    );
  }
  return '';
};

export const getImageFarmer = (imageUrl?: string | null) => {
  return imageUrl ? {uri: imageUrl} : defaultFarmer;
};

export const getFormatDateTime = (num: number) => {
  return num < 10 ? `0${num}` : num.toString();
};

export const convertDateToString = (date: Date | string) => {
  if (!date || date === '') {
    return;
  } else {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return (
      date?.getFullYear() +
      '-' +
      getFormatDateTime(date?.getMonth() + 1) +
      '-' +
      getFormatDateTime(date?.getUTCDate())
    );
  }
};
