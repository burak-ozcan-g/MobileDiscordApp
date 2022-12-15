import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, Dimensions, FlatList } from 'react-native'
import styles from './Main.style'

import Animated, { useAnimatedGestureHandler, withTiming, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import SysBar from 'react-native-system-navigation-bar'
import Color from '../../utils/Color'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PanGestureHandler } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import DMCard from '../../components/Cards/DMCard';

import { useDispatch } from 'react-redux'
import { setId, setHeader } from '../../context/MainViewProvider/MainViewSlice'

const { width } = Dimensions.get('screen');

const FirstMain = ({ mainAnimVal, activeMain }) => {
  const [dMessages, setDMessages] = useState([])

  useEffect(() => {
    StatusBar.setBackgroundColor(Color.DarkGray2)
    SysBar.setNavigationColor(Color.DarkGray3)

  }, [])

  useEffect(() => {
    firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(currentUserQS => {
      currentUserQS.forEach(currentUserDS => {
        firestore().collection('Requests').doc(currentUserDS.id).collection('friendList').onSnapshot(friendQS => {
          const users = [];
          friendQS.forEach(friendDS => {
            users.push({
              ...friendDS.data(),
              key: friendDS.id,
            })
          })
          console.log('chat: ', users)
          setDMessages(users)
        })
      })
    })
  }, [])

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = mainAnimVal.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) {
        mainAnimVal.value = event.translationX + ctx.x;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationX < ((width * 82) / 100) / 2) {
        mainAnimVal.value = withTiming(1);
        activeMain.value = 2;
      } else {
        mainAnimVal.value = withTiming(ctx.x);
        activeMain.value = 1;
      }
    },
  });

  const dispacth = useDispatch()

  const handleDMCard = item => {
    mainAnimVal.value = 0
    activeMain.value = 2

    dispacth(setHeader({
      header: item.username,
    }))

    firestore().collection('Users').where('username', '==', item.username).get().then(friendQS => {
      friendQS.forEach(friendDS => {
        firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(userQS => {
          userQS.forEach(async userDS => {
            const chatUid = friendDS.get('uid') > userDS.get('uid')
              ? userDS.get('uid') + "-" + friendDS.get('uid')
              : friendDS.get('uid') + "-" + userDS.get('uid')
            dispacth(setId({
              id: chatUid,
            }))
          });
        });
      });
    })

  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.firstMainContainer]} >
        <View style={styles.serverNavContainer}>
          <View style={styles.commonIconStyle}>
            <Icon name='chat-bubble' size={25} color={Color.IconGray2} />
          </View>
        </View>
        <View style={styles.serverDetailsContainer}>
          <View style={styles.detail_container}>
            <Text style={styles.detail_text}>Direkt Mesajlar</Text>
            <Icon name='chat-bubble' size={20} />
          </View>
          <View>
            <FlatList
              data={dMessages}
              renderItem={({ item }) => (
                <DMCard item={item} onPress={() => { handleDMCard(item) }} />
              )}
            />
          </View>


        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}
export default FirstMain;