import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './HPButton.style'

const HPButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View>
        <Icon name={name} size={25} />
      </View>
    </TouchableOpacity>
  )
}
export default HPButton;