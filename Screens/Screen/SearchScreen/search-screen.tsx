import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  backButtonIcon,
  banner1,
  cartIcon,
  filterIcon,
  searchIcon,
} from '../../constants/assets.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {styles} from './search-screen-style';

export const SearchScreen = () => {
  const navigator = useNavigation();
  const [chooseNumber, setChooseNumber] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Image
              source={backButtonIcon}
              style={{
                height: 25,
                width: 25,
                transform: [{scaleX: -1}],
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '70%',
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 36,
              borderRadius: 12,
            }}>
            <TextInput
              style={{width: '80%', fontSize: FontSize.MediumSmall}}
              placeholder="Explore..."
            />
            <TouchableOpacity
              onPress={() => navigator.navigate('SearchScreen')}>
              <Image
                source={searchIcon}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <ImageBackground
              source={filterIcon}
              style={{
                height: 25,
                width: 25,
                zIndex: 500,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  width: '40%',
                  borderRadius: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  backgroundColor: Colors.FilterGreen,
                  fontSize: FontSize.ExtraSmall,
                }}>
                {chooseNumber}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultNumber}>50 results are found</Text>
        <ScrollView>
          <View style={styles.allResultContainer}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const ProductCard = () => {
  return (
    <TouchableOpacity style={styles.productCardContainer}>
      <View style={styles.borderCard}>
        <Text
          style={{
            fontSize: 11,
            width: '80%',
            textAlign: 'center',
            paddingTop: '5%',
            // backgroundColor: 'red',
          }}>
          500 kg
        </Text>
      </View>
      <View style={styles.productContainer}>
        <Image style={styles.productImage} source={banner1} />
        <Text numberOfLines={2} style={styles.productName}>
          ONION HAHAHAHH ufiysiyauyd asd asdde dawd
        </Text>
        <Text numberOfLines={1} style={styles.productFarmName}>
          MyFarm
        </Text>
        <Text numberOfLines={2} style={styles.productLocation}>
          Dĩ An, Bình Dương
        </Text>
      </View>
    </TouchableOpacity>
  );
};
