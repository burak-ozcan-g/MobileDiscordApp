import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from './TouchText.style'

const TouchText = ({text}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}
export default TouchText;