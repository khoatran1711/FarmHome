import {I18n} from '../translation';
import {
  fruitCategory,
  greenCategory,
  peaCategory,
  spiceCategory,
  tuberCategory,
} from './assets.constants';

export const CategoryList = {
  Fruit: {
    name: I18n.fruit,
    image: fruitCategory,
    id: 1,
  },
  Green: {
    name: I18n.green,
    image: greenCategory,
    id: 2,
  },
  Tuber: {
    name: I18n.tuber,
    image: tuberCategory,
    id: 3,
  },
  Pea: {
    name: I18n.pea,
    image: peaCategory,
    id: 4,
  },
  Spice: {
    name: I18n.spice,
    image: spiceCategory,
    id: 5,
  },
};
