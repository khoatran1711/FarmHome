import {Linking} from 'react-native';
import {defaultFarmer} from '../constants/assets.constants';
import {CategoryList} from '../constants/category.constant';
import {RootStore, RootStoreType} from '../domain/store';
import {Location} from '../Screen/Models/farmer.model';
import {PopupActions} from '../state/popup-dialog/popup-dialog.state';

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

export const getFarmerShortLocation = (location: Location | undefined) => {
  if (location) {
    return (
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

export const convertDateJsonToDate = (date?: string) => {
  if (!date || date === '') return;
  else {
    const list = date.split('-');
    if (list?.length === 3) {
      return `${list[2]}-${list[1]}-${list[0]}`;
    }
    return;
  }
};

export const convertDateJsonToDateMonth = (date?: string) => {
  if (!date || date === '') return;
  else {
    const list = date.split('-');
    if (list?.length === 3) {
      return `${list[2]}/${list[1]}`;
    }
    return;
  }
};

export const convertDateJsonToYear = (date?: string) => {
  if (!date || date === '') return;
  else {
    const list = date.split('-');
    if (list?.length === 3) {
      return `${list[0]}`;
    }
    return;
  }
};

export const convertDateToTime = (date?: Date) => {
  if (!date) return;
  return date?.getHours() + ':' + date?.getMinutes();
};

export const getImageBackground = (category?: string) => {
  switch (category) {
    case CategoryList.Green.label:
      return CategoryList.Green.imageBackground;
    case CategoryList.Pea.label:
      return CategoryList.Pea.imageBackground;
    case CategoryList.Spice.label:
      return CategoryList.Spice.imageBackground;
    case CategoryList.Tuber.label:
      return CategoryList.Tuber.imageBackground;
    default:
      return CategoryList.Fruit.imageBackground;
  }
};

export const getImageVerticalCard = (category?: string) => {
  switch (category) {
    case CategoryList.Green.label:
      return CategoryList.Green.imageCard;
    case CategoryList.Pea.label:
      return CategoryList.Pea.imageCard;
    case CategoryList.Spice.label:
      return CategoryList.Spice.imageCard;
    case CategoryList.Tuber.label:
      return CategoryList.Tuber.imageCard;
    default:
      return CategoryList.Fruit.imageCard;
  }
};

export const PopupShow = (header: string, content: string) => {
  const store: RootStoreType = RootStore;
  store?.dispatch(
    PopupActions.setPopup({
      content: content,
      header: header,
      isShow: true,
    }),
  );
};

export const ErrorHandle = (header: string, content: string) => {
  return PopupShow(header, content);
};

export const getDateBefore = (dateIn: string) => {
  try {
    const date = new Date(dateIn);
    const today = new Date();
    const minus = today?.getTime() - date.getTime();

    // Count by Seconds
    if (minus < 60 * 1000) {
      return Math.round(minus / 1000) + ' giây trước';
    } else if (
      //count by Minutes
      minus > 60 * 1000 &&
      minus < 60 * 1000 * 60
    ) {
      return Math.round((minus / 60) * 1000) + ' phút trước';
    } else if (
      //count by hours
      minus > 60 * 1000 * 60 &&
      minus < 60 * 1000 * 60 * 24
    ) {
      return Math.round(((minus / 60) * 1000) & 60) + ' giờ trước';
    }

    return date?.toDateString();
  } catch (err) {
    console.log(err);
    return '---';
  }
};
