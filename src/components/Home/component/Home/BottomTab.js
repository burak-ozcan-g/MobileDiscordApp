import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../constant/color';
import DiscordIcon from '../svgIcons/DiscordIcon';
import DiscordRound from '../svgIcons/DiscordRound';
import RaiseHandIcon from '../svgIcons/RaiseHandIcon';
import SearchIcon from '../svgIcons/SearchIcon';

const BottomTab = ({ sheetAnimVal }) => {
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            sheetAnimVal.value,
            [(-width * 82) / 100, 0, (width * 82) / 100],
            [60, 60, 0],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.navContainer, animatedStyle]}>
      <View style={styles.commonStyle}>
        <DiscordIcon width={25} height={25} fill="white" />
      </View>
      <View style={styles.commonStyle}>
        <RaiseHandIcon width={25} height={25} fill="white" />
      </View>

      <View style={styles.commonStyle}>
        <SearchIcon width={25} height={25} fill="white" />
      </View>

      {/* {put an icon here, i'll fix it in final code} */}
      <View style={styles.commonStyle}>
        <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>
          @
        </Text>
      </View>

      <View style={styles.commonStyle}>
        <DiscordRound width={25} height={25} fill="white" />
      </View>
    </Animated.View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  navContainer: {
    height: 60,
    backgroundColor: colors.black,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  commonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});