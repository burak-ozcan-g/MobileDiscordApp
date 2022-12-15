import React from "react";
import { SafeAreaView, TextInput } from "react-native";
import Color from "../../utils/Color";

import styles from './Input.style'

const Input = ({ placeholder, value, onType, isSecure=false }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onType}
        value={value}
        secureTextEntry={isSecure}
        placeholderTextColor={Color.TextGray}
      >
      </TextInput>
    </SafeAreaView>
  )
}

export default Input;