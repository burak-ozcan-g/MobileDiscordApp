import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constant/color';
import {END_WIDTH, START_WIDTH} from '../../constant/config';

const ThirdSheet = ({sheetAnimVal, activeSheet}) => {
  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = sheetAnimVal.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX > 0) {
        sheetAnimVal.value = event.translationX + ctx.x;
      }
    },
    onEnd: (event, ctx) => {
      console.log(event.translationX);
      if (event.translationX > START_WIDTH / 2) {
        sheetAnimVal.value = withTiming(1);
        activeSheet.value = 2;
      } else {
        sheetAnimVal.value = withTiming(ctx.x);
        activeSheet.value = 3;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            sheetAnimVal.value * 255,
            [END_WIDTH, 0, START_WIDTH],
            [0, 0, START_WIDTH],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.thirdSheetContainer, animatedStyle]}>
        <View style={styles.thirdSheetStyle}>
          <Text style={{color: 'white'}}>Third Sheet</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ThirdSheet;

const styles = StyleSheet.create({
  thirdSheetContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdSheetStyle: {
    width: '80%',
    borderRadius: 8,
    height: '98%',
    alignSelf: 'flex-end',
    backgroundColor: colors.sheetColor,
  },
});