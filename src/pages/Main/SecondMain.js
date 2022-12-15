import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, Dimensions, TextInput, FlatList } from 'react-native'
import styles from './Main.style'

import SysBar from 'react-native-system-navigation-bar'
import Color from '../../utils/Color'
import HeaderButton from '../../components/HPButton'

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import MiniButton from '../../components/MiniButton'

import firestore from '@react-native-firebase/firestore'

import { useSelector } from 'react-redux'
import MessageCard from '../../components/Cards/MessageCard'

import auth from '@react-native-firebase/auth'
import CallingScreenModal from '../../components/modal/CallingScreenModal/CallingScreenModal'

import { Voximplant } from 'react-native-voximplant'

const { width } = Dimensions.get('screen');

const SecondMain = ({ mainAnimVal, activeMain }) => {

  ///--------------animated***********--------
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: mainAnimVal.value }],
    };
  });

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = mainAnimVal.value;
    },
    onActive: (event, ctx) => {
      mainAnimVal.value = event.translationX + ctx.x;
    },
    onEnd: (event, ctx) => {
      console.log(event.translationX);

      if (
        (activeMain.value === 1 && event.translationX > 0) ||
        (activeMain.value === 3 && event.translationX < 0)
      ) {
        mainAnimVal.value = ctx.x;
      } else if (event.absoluteX > width / 2 && activeMain.value === 2) {
        mainAnimVal.value = withTiming((width * 87) / 100);
        activeMain.value = 1;
      } else if (event.translationX < -width / 2 && activeMain.value === 2) {
        mainAnimVal.value = withTiming((-width * 87) / 100);
        activeMain.value = 3;
      } else if (activeMain !== 2) {
        mainAnimVal.value = withTiming(0);
        activeMain.value = 2;
      }
    },
  });
  //*------------------animated********-------

  //------------------------chat-------------------------
  const [message, setMessage] = useState('')

  const headerName = useSelector((state) => state.MainView.header)
  const chatUid = useSelector((state) => state.MainView.id)

  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    firestore().collection('DMessages').doc(chatUid).collection('messages').onSnapshot(messageQuery => {
      const messages = []
      const sorted_messages = []
      messageQuery.forEach(messageDocument => {
        messages.push({
          ...messageDocument.data(),
          key: messageDocument.id
        })
      })
      {
        messages ? messages.sort((a, b) => a.date < b.date ? 1 : -1)
          .map((m) => { sorted_messages.push(m) }) : null
      }
      setMessageList(sorted_messages);
    })
  }, [chatUid])

  const handleMessageSend = () => {
    firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(userQS => {
      userQS.forEach(async userDS => {
        await firestore().collection('DMessages').doc(chatUid).collection('messages').add({
          message: message,
          username: userDS.get('username'),
          from: userDS.id,
          date: new Date().toISOString(),
        })
      })
    })
    setMessage('')
  }
  // ------------------chat -------------------------

  const voximplant = Voximplant.getInstance();

  const [callingVisible, setCallingVisible] = useState(false)
  const [incomingCall, setIncomingCall] = useState();
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      setIncomingCall(incomingCallEvent.call);
      setIsActive(true)
      setCallingVisible(true);
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  const handleClose = () => {
    setCallingVisible(false)
  }
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.secondMainContainer, animatedStyle]} >
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <HeaderButton name={'menu'} />
            <Text style={styles.header_ed}>@</Text>
            <Text style={styles.header_text}>{headerName}</Text>
          </View>
          {headerName.length ? <View style={{ flexDirection: 'row' }}>
            <HeaderButton name={'call'} onPress={() => setCallingVisible(true)} />
            <HeaderButton name={'videocam'} />
            <HeaderButton name={'people-alt'} />
          </View> : null}
        </View>
        <FlatList
          style={styles.message_list}
          data={messageList}
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
          renderItem={({ item }) => (
            <MessageCard item={item} />
          )} />

        <View style={styles.bottom_input}>
          <TextInput
            style={styles.msg_input}
            placeholder={'mesaj gönder'}
            onChangeText={setMessage}
            value={message}
          />
          {message.length ? <MiniButton icon={'send'} color={Color.DcBlue} onPress={() => { handleMessageSend() }} /> : null}
        </View>
        <CallingScreenModal
          incomingCall={incomingCall}
          visible={callingVisible}
          handleBack={handleClose}
          isActive={isActive}
          setActive={()=> setIsActive(false)}
        />
      </Animated.View>
    </PanGestureHandler>
  )
}
export default SecondMain;