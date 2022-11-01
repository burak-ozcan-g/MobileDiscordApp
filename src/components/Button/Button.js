import React from 'react'
import { ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';

import styles from './Button.style'

const Button = ({ text, onPress, loading, theme = 'primary' }) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <View style={styles[theme].button_container}>
          <Text style={styles[theme].title}> {text} </Text>
        </View>
      )}

    </TouchableOpacity >
  )
}
export default Button;