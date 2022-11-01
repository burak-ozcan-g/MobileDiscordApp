import React from "react";
import { SafeAreaView, TextInput } from "react-native";

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
        placeholderTextColor={'#B1B2B7'}
      >
      </TextInput>
    </SafeAreaView>
  )
}

export default Input;