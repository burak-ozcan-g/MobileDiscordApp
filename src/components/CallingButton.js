import React from "react";
import { TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const CallingButton = ({ name, iconColor, color, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} style={{
      margin: 10,
      height: 60,
      width: 60,
      borderRadius: 29,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon name={name} size={32} color={iconColor} />
    </TouchableHighlight>
  )
}
export default CallingButton;