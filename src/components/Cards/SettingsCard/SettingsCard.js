import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Color from "../../../utils/Color";
import styles from './SettingsCard.style'

const SettingsCard = ({ icon, text, onPress }) => {
  return (
    <TouchableHighlight underlayColor={Color.LightGray2} onPress={onPress}>
      <View style={styles.container}>
        <Icon name={icon} size={25} color={Color.TextGray} />
        <Text style={styles.text}> {text} </Text>
      </View>
    </TouchableHighlight>
  )
}
export default SettingsCard;