import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import FirstPage from './pages/First'
import FirstMainPage from './pages/Main/FirstMain'
import SecondMainPage from './pages/Main/SecondMain'
import ThirdMainPage from './pages/Main/ThirdMain'
import FriendsPage from './pages/Friends'
import SearchPage from './pages/Search'
import TagsPage from './pages/Tags'
import SettingsPage from './pages/Settings'
import UserProfilePage from './pages/UserProfile';

import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Color from './utils/Color';
import AddFriendsModal from './components/modal/AddFriendsModal';
import DenemePage from './pages/Deneme';
import FlashMessage from 'react-native-flash-message';
import { useSharedValue } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Provider } from 'react-redux'
import { store } from './context/MainViewProvider/store'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Router() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    })
  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='FirstScreen' component={FirstPage} />
        <Stack.Screen name='LoginScreen' component={LoginPage} />
        <Stack.Screen name='RegisterScreen' component={RegisterPage} />
      </Stack.Navigator>
    )
  }

  const mainAnimVal = useSharedValue(0)
  const activeMain = useSharedValue(2);
  const MainStack = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FirstMainPage mainAnimVal={mainAnimVal} activeMain={activeMain} />
        <ThirdMainPage mainAnimVal={mainAnimVal} activeMain={activeMain} />
        <SecondMainPage mainAnimVal={mainAnimVal} activeMain={activeMain} />
      </GestureHandlerRootView>
    )
  }

  const FriendsStack = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name='FriendsScreen' component={FriendsPage} />
        <Stack.Screen name='AddFriendsModalScreen' component={AddFriendsModal} />
      </Stack.Navigator>
    )
  }

  const SettingStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='SettingsScreen' component={SettingsPage} />
        <Stack.Screen name='UserProfileScreen' component={UserProfilePage} />
      </Stack.Navigator>
    )
  }

  const MainTab = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle: { borderTopWidth: 0 },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: Color.DarkGray3,
        tabBarInactiveBackgroundColor: Color.DarkGray3,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;
          if (route.name === 'MainStack') {
            iconName = 'home';
            iconColor = focused ? 'white' : Color.LightGray1;
          } else if (route.name === 'FriendsStack') {
            iconName = 'people';
            iconColor = focused ? 'white' : Color.LightGray1;
          } else if (route.name === 'SearchScreen') {
            iconName = 'search';
            iconColor = focused ? 'white' : Color.LightGray1;
          } else if (route.name === 'TagsScreen') {
            iconName = 'alternate-email';
            iconColor = focused ? 'white' : Color.LightGray1;
          } else if (route.name === 'SettingStack') {
            iconName = 'home';
            iconColor = focused ? 'white' : Color.LightGray1;
          }
          return <Icon name={iconName} size={27} color={iconColor} />
        },
      })}>
        <Tab.Screen name='MainStack' component={MainStack} />
        <Tab.Screen name='FriendsStack' component={FriendsStack} />
        <Tab.Screen name='SearchScreen' component={SearchPage} />
        <Tab.Screen name='TagsScreen' component={TagsPage} />
        <Tab.Screen name='SettingStack' component={SettingStack} />
      </Tab.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!userSession ? (
          AuthStack()
        ) : (
          MainTab()
        )}
        <FlashMessage position={'top'} />
      </NavigationContainer>
    </Provider>
  )
}

export default Router;

/*import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import BottomTab from './components/Home/component/Home/BottomTab';
import FirstSheet from './components/Home/component/Home/FirstSheet';
import SecondSheet from './components/Home/component/Home/SecondSheet';
import ThirdSheet from './components/Home/component/Home/ThirdSheet';
import { colors } from './components/Home/constant/color';

const Router = () => {
  const sheetAnimVal = useSharedValue(0);
  const activeSheet = useSharedValue(2);

  return (
    <>
      <StatusBar backgroundColor={colors.sheetColor} />
      <View style={{ width: '100%', height: '90%' }}>
        <FirstSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <ThirdSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <SecondSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
        <BottomTab sheetAnimVal={sheetAnimVal} />
      </View>
    </>
  );
};
export default Router;*/