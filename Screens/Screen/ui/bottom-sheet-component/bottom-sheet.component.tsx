import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../../constants/color.constants';
import {styles} from './bottom-sheet.style';

export interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  // snapPoint: string;
  children: React.ReactNode;
  height?: string;
}

export const CustomBottomSheet = (props: CustomBottomSheetProps) => {
  // const snapPoints = useMemo(() => [props.snapPoint], [props.snapPoint]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    params => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...params}
        enableTouchThrough={() => props.onClose()}
      />
    ),
    [props],
  );

  return props.visible ? (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onClose={() => props.onClose()}
      enableOverDrag
      backgroundStyle={{backgroundColor: Colors.TimberGreen}}
      snapPoints={[props?.height ? props?.height : '80%']}>
      <View style={styles.container}>{props.children}</View>
    </BottomSheet>
  ) : (
    <></>
  );
};
