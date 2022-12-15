import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constant/color';
import {START_WIDTH} from '../../constant/config';
import ServerDetails from '../FirstSheet/ServerDetails';
import ServerNavbar from '../FirstSheet/ServerNavbar';

const FirstSheet = ({sheetAnimVal, activeSheet}) => {
  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = sheetAnimVal.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) {
        sheetAnimVal.value = event.translationX + ctx.x;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationX < START_WIDTH / 2) {
        sheetAnimVal.value = withTiming(1);
        activeSheet.value = 2;
      } else {
        sheetAnimVal.value = withTiming(ctx.x);
        activeSheet.value = 1;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.firstSheetContainer]}>
        <ServerNavbar />
        <ServerDetails />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default FirstSheet;

const styles = StyleSheet.create({
  firstSheetContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: colors.navColor,
  },
});