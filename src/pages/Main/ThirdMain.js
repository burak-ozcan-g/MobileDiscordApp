import React from 'react'
import { Text, Dimensions, View } from 'react-native'
import styles from './Main.style'

import SysBar from 'react-native-system-navigation-bar'
import Color from '../../utils/Color'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const { width } = Dimensions.get('screen');

const ThirdMain = ({ mainAnimVal, activeMain }) => {

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            mainAnimVal.value,
            [((-width * 82) / 100), 0, ((width * 82) / 100)],
            [0, 0, ((width * 82) / 100)],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = mainAnimVal.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX > 0) {
        mainAnimVal.value = event.translationX + ctx.x;
      }
    },
    onEnd: (event, ctx) => {
      console.log(event.translationX);
      if (event.translationX > ((width * 82) / 100) / 2) {
        mainAnimVal.value = withTiming(1);
        activeMain.value = 2;
      } else {
        mainAnimVal.value = withTiming(ctx.x);
        activeMain.value = 3;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.thirdMainContainer, animatedStyle]} >
        <View style={styles.thirdMainStyle}>
          <Text style={{ color: 'black' }} >third</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}
export default ThirdMain;