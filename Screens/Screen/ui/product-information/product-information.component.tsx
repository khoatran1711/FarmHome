import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  banner,
  locationIcon,
  priceIcon,
  transportIcon,
  validAmountIcon,
} from '../../../constants/assets.constants';
import {I18n} from '../../../translation';
import {getImage} from '../../../utilities/format-utilities';
import {getFarmerLocation} from '../../../utilities/help-utilities';
import {Order, OrderHistory} from '../../Models/order.model';

import {IconWithLabel} from '../icon-with-label';
import {styles} from './product-information.style';

interface ProductInformationProps {
  order?: Order | OrderHistory;
}

export const ProductInformation = (props?: ProductInformationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imageHeaderContainer}>
          <View style={styles.imageHeader}>
            <Image
              source={getImage(props?.order?.fruit?.images[0]?.url)}
              style={styles.image}
            />
          </View>
        </View>

        <Text style={styles.productName}>
          {props?.order?.fruit?.name?.toUpperCase()}
        </Text>
      </View>

      <View style={styles.iconLabelContainer}>
        <IconWithLabel
          icon={validAmountIcon}
          label={props?.order?.amount + ' ' + props?.order?.fruit?.unit}
        />
        <IconWithLabel
          icon={priceIcon}
          label={`${props?.order?.amount}000 đ/`}
          smallLabel={props?.order?.fruit?.unit}
        />
      </View>
      <IconWithLabel
        icon={transportIcon}
        label={
          props?.order?.transport
            ? I18n.transportSupport
            : I18n.notTransportSupport
        }
      />

      {props?.order?.transport && (
        <View style={{alignSelf: 'center', width: '80%'}}>
          <View style={styles.verticalLine} />

          <Image style={styles.locationIcon} source={locationIcon} />

          <Text style={styles.location}>
            {getFarmerLocation(props?.order?.deliveryLocation)}
          </Text>
        </View>
      )}
    </View>
  );
};
