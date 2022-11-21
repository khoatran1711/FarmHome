import {useNavigation} from '@react-navigation/native';
import {selection} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {backButtonIcon, banner} from '../../constants/assets.constants';
import {
  categoryIcon,
  searchIcon,
  cartIcon,
  filterIcon,
  exploreBanner1,
  exploreBanner2,
  exploreBanner3,
  filterchosen,
} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {styles} from './explore-screen.style';

const filterList = [
  {
    id: 1,
    name: 'Trái cây 1',
  },
  {
    id: 2,
    name: 'Trái cây 2',
  },
  {
    id: 3,
    name: 'Trái cây 3',
  },
  {
    id: 4,
    name: 'Trái cây 4',
  },
  {
    id: 5,
    name: 'Trái cây 5',
  },
];

const width = Dimensions.get('window').width;

const SORT_BY_TYPE = ['Location', 'Hot', 'New', 'Amount'];

const SORT_LIST = [
  {
    name: 'SORT BY',
    type_list: [
      {
        id: 1,
        name: 'Location',
        isSelect: false,
      },
      {
        id: 2,
        name: 'Hot',
        isSelect: false,
      },
      {
        id: 3,
        name: 'New',
        isSelect: false,
      },
      {
        id: 4,
        name: 'Amount',
        isSelect: false,
      },
    ],
  },
  {
    name: 'THIS SEASON FRUITS',
    type_list: [
      {
        id: 1,
        name: 'Trái cây 1',
        isSelect: false,
      },
      {
        id: 2,
        name: 'Trái cây 2',
        isSelect: false,
      },
      {
        id: 3,
        name: 'Trái cây 3',
        isSelect: false,
      },
      {
        id: 4,
        name: 'Trái cây 4',
        isSelect: false,
      },
      {
        id: 5,
        name: 'Trái cây 5',
        isSelect: false,
      },
    ],
  },
];

const bigger = new Animated.Value((width * 120) / 100);
let isChooseFilter = true;

export const ExploreScreen = ({navigation}) => {
  const navigator = useNavigation();
  const [selectList, setSelectList] = useState(filterList[0].id);

  const click = () => {
    isChooseFilter = !isChooseFilter;
    return isChooseFilter
      ? Animated.timing(bigger, {
          toValue: (width * 120) / 100,
          duration: 800,
          useNativeDriver: false,
        }).start()
      : Animated.timing(bigger, {
          toValue: (width * 20) / 100,
          duration: 800,
          useNativeDriver: false,
        }).start();
  };

  const [chooseNumber, setChooseNumber] = useState(0);

  const [chooseList, setChooseList] = useState([]);

  const addToFilter = selection => {
    if (selection.isSelect) {
      selection.isSelect = false;
      setChooseNumber(chooseNumber - 1);
      let newChooseList = chooseList;
      newChooseList.forEach((element, index) => {
        if (element === selection.name) {
          newChooseList.splice(index, 1);
          index--;
        }
      });
      setChooseList(newChooseList.filter(item => item !== selection.name));
    } else {
      selection.isSelect = true;
      setChooseNumber(chooseNumber + 1);
      let newChooseList = chooseList;
      newChooseList.push(selection.name);
      setChooseList(newChooseList);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.filterContainer,
          {
            marginLeft: bigger,
          },
        ]}>
        <View style={styles.filterHeaderContainer}>
          <TouchableOpacity onPress={() => click()}>
            <Image source={backButtonIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.filterTitle}>FILTER</Text>
        </View>

        <View style={styles.sortContainer}>
          {SORT_LIST.map(sorttype => (
            <View style={styles.sortContentContainer}>
              <Text style={styles.sortByTitle}>{sorttype.name}</Text>
              <View style={styles.sortTypesContainer}>
                {sorttype.type_list.map(type => (
                  <TouchableOpacity
                    style={styles.typeContainer}
                    onPress={() => addToFilter(type)}>
                    <Text
                      style={[
                        styles.typeName,
                        type.isSelect && styles.typeNameSelected,
                      ]}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.line} />
            </View>
          ))}
        </View>
      </Animated.View>

      <View>
        <ImageBackground
          borderBottomRightRadius={80}
          style={styles.bannerBackground}
          source={exploreBanner3}>
          <View style={styles.exploreHeaderContainer}>
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchInput} placeholder="Explore..." />
              <TouchableOpacity
                onPress={() => navigator.navigate('SearchScreen')}>
                <Image source={searchIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Image source={cartIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => click()}>
              <ImageBackground source={filterIcon} style={styles.icon}>
                <Text style={styles.numberTypeChosen}>{chooseNumber}</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ScrollView
          style={styles.categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {filterList.map(filter => (
            <View style={styles.categoryContainer} key={filter.id}>
              <TouchableOpacity onPress={() => setSelectList(filter.id)}>
                <ImageBackground
                  resizeMode="stretch"
                  style={{
                    width: 100,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={selectList === filter.id && filterchosen}>
                  <Text
                    style={{color: Colors.YellowGreen, marginHorizontal: 10}}>
                    {filter.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              {selectList === filter.id && (
                <View style={styles.chooseCategoryContainer}>
                  <View style={styles.chooseCategory} />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.categoryProductContainer}>
          <TouchableOpacity>
            <View style={styles.productContainer}>
              <ImageBackground source={banner} style={styles.productBackground}>
                <View style={styles.backgroundBlack}>
                  <Text style={styles.productName}>Orange</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
