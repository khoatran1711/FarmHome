import React from 'react';
import {ImageSourcePropType, Text, View} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import {hourglassIcon} from '../../../constants/assets.constants';
import {Colors} from '../../../constants/color.constants';
import {OrderStatus} from '../../../constants/status.constant';
import {I18n} from '../../../translation';
import {styles} from './waiting-card.style';

interface WaitingCardProps {
  farmerName: string;
  farmerImage: ImageSourcePropType;
  productName: string;
  productImage: ImageSourcePropType;
  productPrice: number;
  productAmount: number;
  status?: string;
  isTransport: boolean;
  date?: string;
  unit: string;
  onPress: () => void;
  isNoticed?: boolean;
}

export const WaitingCard = (props?: WaitingCardProps) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props?.onPress}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row'}}>
            {props?.farmerImage && (
              <View style={styles.farmerImageContainer}>
                <Image source={props?.farmerImage} style={styles.image} />
              </View>
            )}
            <Text style={styles.farmerName}>{props?.farmerName}</Text>
          </View>

          {props?.isNoticed && (
            <View style={styles.notification}>
              <Text style={{color: Colors.Solitaire}}>!</Text>
            </View>
          )}
        </View>

        <View style={styles.productContainer}>
          <View style={styles.generalProductInfo}>
            <Text style={styles.productName} numberOfLines={1}>
              {props?.productName}
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                {props?.productPrice} 000đ/{props?.unit}
              </Text>
              <Text style={styles.infoTitle}>
                x {props?.productAmount} {props?.unit}
              </Text>
              <Text style={styles.infoTitle}>
                {props?.isTransport
                  ? I18n.transportSupport
                  : I18n.notTransportSupport}
              </Text>

              {props?.date &&
                (props?.status === OrderStatus.Fail ? (
                  <Text style={[styles.infoTitle, {color: Colors.RumRed}]}>
                    {I18n.orderBeingReport}
                  </Text>
                ) : (
                  <Text style={styles.infoTitle}>
                    {I18n.createAt}
                    {props?.date}
                  </Text>
                ))}
            </View>
            {!props?.date && (
              <View style={styles.waitingContainer}>
                {props?.status !== OrderStatus.Cancel ? (
                  <View style={styles.hourglassImage}>
                    <Image source={hourglassIcon} style={styles.image} />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.button, styles.disagreeButton]}>
                    <Text style={styles.disagree}>✕</Text>
                  </TouchableOpacity>
                )}
                {props?.status !== OrderStatus.Cancel ? (
                  <Text style={styles.waitingTitle}>
                    {I18n.waitingForAccept}
                  </Text>
                ) : (
                  <Text style={styles.waitingTitle}>
                    {I18n.yourOrderHasBeenCanceled}
                  </Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.productImageBackground}>
            <View style={styles.productImage}>
              <Image source={props?.productImage} style={styles.image} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
