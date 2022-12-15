import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constant/color';
import MessageIcon from '../svgIcons/MessageIcon';
import PlusIcon from '../svgIcons/PlusIcon';

const ServerNavbar = () => {
  return (
    <View style={styles.serverNavbarContainer}>
      <View style={styles.commonIconStyle}>
        <MessageIcon width={18} height={18} fill="white" />
      </View>

      {/* here will be the list of servers */}

      <View style={styles.commonIconStyle}>
        <Text style={{ color: colors.textColor }}>1st</Text>
      </View>
      <View style={styles.commonIconStyle}>
        <Text style={{ color: colors.textColor }}>2nd</Text>
      </View>

      <View style={styles.commonIconStyle}>
        <PlusIcon width={14} height={14} fill="lightgreen" />
      </View>
    </View>
  );
};

export default ServerNavbar;

const styles = StyleSheet.create({
  serverNavbarContainer: {
    width: '20%',
    height: '98%',
    alignSelf: "flex-end",
    alignItems: "center"
  },
  commonIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.sheetColor,
    marginBottom: 10
  },
});