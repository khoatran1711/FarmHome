import React from 'react';
import {ScrollView} from 'react-native';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {banner1} from '../../constants/assets.constants';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';
import {GoBackButton} from '../ui/goBack-button-component/goback-button.component';
import {styles} from './user-profile-style';

export const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={banner1} style={styles.userBackground}>
          <View style={styles.background}>
            <GoBackButton />
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.welcomeTitle}>Welcome,</Text>
                <Text style={styles.welcomeName}>USerre</Text>
              </View>
              <View style={styles.userImageContainer}>
                <View style={styles.userImage}>
                  <Image style={styles.cameraIcon} />
                </View>
                <TouchableOpacity
                  style={styles.changeImageBtn}></TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Phone</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Birth Date</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Thành phố</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Quận / Tỉnh</Text>
            <TextInput style={styles.inputText} />
          </View>

          <View style={styles.infoInputContainer}>
            <Text style={styles.inputTitle}>Phường</Text>
            <TextInput style={styles.inputText} />
          </View>

          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmTitle}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
