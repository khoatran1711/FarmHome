import {style} from '@mui/system';
import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {I18n} from '../../../translation';
import {GoBackButton} from '../goBack-button-component/goback-button.component';
import {styles} from './selecting-screen.style';

interface ModalProps {
  data: {
    name: string;
    value: any;
  }[];
  onSelect: (e: any) => void;
  title: string;
  isShow: boolean;
  onClose: () => void;
}

export const SelectingScreenComponent = props => {
  return (
    <Modal visible={props?.isShow}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={() => props?.onClose()}>
          <Text style={styles.closeText}> {I18n.cancel} </Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{props?.title || I18n.chooseOne}</Text>

            {props?.data?.map(item => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => props?.onSelect(item)}>
                <Text style={styles.itemText}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
