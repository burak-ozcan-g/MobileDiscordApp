import React, { useEffect } from 'react'
import { SafeAreaView, View } from 'react-native';

import styles from './First.style'

import Button from '../../components/Button'

import SysBar from 'react-native-system-navigation-bar'
import Color from '../../utils/Color';

const First = ({ navigation }) => {

  useEffect(() => {
    SysBar.setNavigationColor(Color.DcGray)
  }, [])

  const handleSignUp = () => {
    navigation.navigate('RegisterScreen');
  }
  const handleSignIn = () => {
    navigation.navigate('LoginScreen');
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.button_container}>
        <Button text='Kaydol' onPress={handleSignUp} />
        <Button text='Giriş Yap' onPress={handleSignIn} theme='secondary' />
      </View>
    </SafeAreaView>

  )
}
export default First;