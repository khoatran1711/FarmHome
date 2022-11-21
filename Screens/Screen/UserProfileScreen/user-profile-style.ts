import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color.constants';
import {FontSize} from '../../constants/fontsize.constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userBackground: {
    height: 220,
    width: '100%',
    backgroundColor: 'red',
  },
  titleContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  welcomeTitle: {
    fontSize: FontSize.MediumLarge,
    color: '#FFFFFF90',
  },
  welcomeName: {
    fontSize: FontSize.Large,
    color: Colors.White,
  },
  userImageContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  changeImageBtn: {
    width: 30,
    height: 30,
    backgroundColor: 'yellow',
    borderRadius: 10,
    marginTop: 75,
    marginLeft: -15,
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingHorizontal: '3%',
  },
  inputTitle: {
    fontSize: FontSize.Normal,
    color: Colors.DarkGreen,
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: Colors.DarkGreen,
    color: Colors.DarkGreen,
  },
  infoInputContainer: {
    marginVertical: 10,
  },
  confirmBtn: {
    width: 80,
    height: 40,
    backgroundColor: Colors.DarkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  confirmTitle: {
    color: Colors.White,
  },
  background: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '3%',
    paddingTop: 10,
    backgroundColor: '#00000090',
  },
  headerContainer: {
    flexDirection: 'row',
  },
});
