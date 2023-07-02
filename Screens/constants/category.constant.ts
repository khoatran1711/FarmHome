import {I18n} from '../translation';
import {
  fruitCategory,
  fruitProductDetail,
  greenCategory,
  greenProductDetail,
  peaCategory,
  peaProductDetail,
  productVerticalCardFruit,
  productVerticalCardGreen,
  productVerticalCardPea,
  productVerticalCardSpice,
  productVerticalCardTuber,
  spiceCategory,
  spiceProductDetail,
  tuberCategory,
  tuberProductDetail,
} from './assets.constants';

export const CategoryList = {
  Fruit: {
    name: I18n.fruit,
    image: fruitCategory,
    imageBackground: fruitProductDetail,
    imageCard: productVerticalCardFruit,
    id: 1,
    label: 'Trái cây',
  },
  Green: {
    name: I18n.green,
    image: greenCategory,
    imageBackground: greenProductDetail,
    imageCard: productVerticalCardGreen,
    id: 2,
    label: 'Rau xanh',
  },
  Tuber: {
    name: I18n.tuber,
    image: tuberCategory,
    imageBackground: tuberProductDetail,
    imageCard: productVerticalCardTuber,
    id: 3,
    label: 'Rau củ',
  },
  Pea: {
    name: I18n.pea,
    image: peaCategory,
    imageBackground: peaProductDetail,
    imageCard: productVerticalCardPea,
    id: 4,
    label: 'Đậu',
  },
  Spice: {
    name: I18n.spice,
    image: spiceCategory,
    imageBackground: spiceProductDetail,
    imageCard: productVerticalCardSpice,
    id: 5,
    label: 'Gia vị',
  },
};
