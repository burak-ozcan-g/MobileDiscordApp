import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import FirstPage from './pages/First'
import MainPage from './pages/Main'

import auth from '@react-native-firebase/auth'

const Stack = createNativeStackNavigator();

function Router() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    })
  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='FirstScreen' component={FirstPage} />
        <Stack.Screen name='LoginScreen' component={LoginPage} />
        <Stack.Screen name='RegisterScreen' component={RegisterPage} />
      </Stack.Navigator>
    )
  }

  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='MainScreen' component={MainPage} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {!userSession ? (
        AuthStack()
      ) : (
        MainStack()
      )}
    </NavigationContainer>
  )
}

export default Router;