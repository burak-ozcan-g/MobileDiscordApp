import React from "react";
import { View, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Color from "../utils/Color";

const MiniButton = ({ icon, onPress, color }) => {
  return (
    <TouchableHighlight underlayColor={Color.LightGray2} onPress={onPress}
      style={{ backgroundColor: color, alignSelf: 'center', padding: 6, borderRadius: 20, marginLeft: 15,}}>
      <Icon name={icon} size={22} color={Color.IconGray1} />
    </TouchableHighlight>
  )
}
export default MiniButton;