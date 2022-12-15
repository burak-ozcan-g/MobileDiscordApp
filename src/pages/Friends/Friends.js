import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Friends.style'
import Color from '../../utils/Color'

import HeaderButton from '../../components/HPButton';
import SendMessageModal from '../../components/modal/SendMessageModal';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import flashMessage from '../../utils/flashMessage'
import FriendsCard from '../../components/Cards/FriendsCard'

import { useDispatch } from 'react-redux'
import { setId, setHeader } from '../../context/MainViewProvider/MainViewSlice'

const Friends = ({ navigation }) => {
  const dispacth = useDispatch();
  const [sendMessageVisible, setSendMessageVisible] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Arkadaşlar',
      headerStyle: { backgroundColor: Color.DcGray },
      headerTintColor: 'white',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }} >
          <HeaderButton name='mark-chat-unread' onPress={() =>
            setSendMessageVisible(true)} />
          <HeaderButton name='person-add-alt-1' onPress={() => {
            navigation.navigate('AddFriendsModalScreen')
          }} />
        </View>
      )
    })
  }, [navigation])

  const handleSendMessageVisible = () => {
    setSendMessageVisible(!sendMessageVisible)
  }

  const [sentRequests, setSentRequests] = useState([]);
  const [pendingRequests, setpendingRequests] = useState([]);
  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(currentUserQS => {
      currentUserQS.forEach(currentUserDS => {
        firestore().collection('Requests').doc(currentUserDS.id).collection('sentRequests').onSnapshot(sentrequestQS => {
          const users = [];
          sentrequestQS.forEach(sentrequestDS => {
            users.push({
              ...sentrequestDS.data(),
              key: sentrequestDS.id,
            })
          })
          console.log('sent: ', users)
          setSentRequests(users)
        })
        firestore().collection('Requests').doc(currentUserDS.id).collection('pendingRequests').onSnapshot(pendingRequestQS => {
          const users = [];
          pendingRequestQS.forEach(pendingRequestDS => {
            users.push({
              ...pendingRequestDS.data(),
              key: pendingRequestDS.id,
            })
          })
          console.log('pending: ', users)
          setpendingRequests(users)
        })
        firestore().collection('Requests').doc(currentUserDS.id).collection('friendList').onSnapshot(friendListQS => {
          const users = [];
          friendListQS.forEach(friendListDS => {
            users.push({
              ...friendListDS.data(),
              key: friendListDS.id,
            })
          })
          console.log('friend: ', users)
          setFriendList(users)
        })
      })
    })

  }, [])

  const handleRequestCancel = item => {
    if (item.status === 'sent') {
      firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(senderQS => {
        senderQS.forEach(async senderDS => {
          await firestore().collection('Requests').doc(item.key).collection('pendingRequests').doc(senderDS.id).delete()
          await firestore().collection('Requests').doc(senderDS.id).collection('sentRequests').doc(item.key).delete()
        })
      })
    } else if (item.status === 'pending') {
      firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(sentQS => {
        sentQS.forEach(async sentDS => {
          await firestore().collection('Requests').doc(sentDS.id).collection('pendingRequests').doc(item.key).delete()
          await firestore().collection('Requests').doc(item.key).collection('sentRequests').doc(sentDS.id).delete()
        })
      })
    }
  }

  const handleRequestAccept = item => {
    firestore().collection('Users').where('username', '==', item.username).get().then(senderQS => {
      senderQS.forEach(senderDS => {
        firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(sentQS => {
          sentQS.forEach(async sentDS => {

            await firestore().collection('Requests').doc(senderDS.id).collection('friendList')
              .doc(sentDS.id).set({ username: await sentDS.get('username'), status: 'friend' });

            await firestore().collection('Requests').doc(sentDS.id).collection('friendList')
              .doc(senderDS.id).set({ username: await senderDS.get('username'), status: 'friend' });

            await firestore().collection('Requests').doc(sentDS.id).collection('pendingRequests').doc(senderDS.id).delete()
            await firestore().collection('Requests').doc(senderDS.id).collection('sentRequests').doc(sentDS.id).delete()

            console.log('istek onaylandı');
            flashMessage('Arkadaşlık İsteği Onaylandı', 'success');
          });
        });
      });
    })
  }

  const handleMessageSend = item => {
    firestore().collection('Users').where('username', '==', item.username).get().then(friendQS => {
      friendQS.forEach(friendDS => {
        firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(userQS => {
          userQS.forEach(async userDS => {
            const chatUid = friendDS.get('uid') > userDS.get('uid')
              ? userDS.get('uid') + "-" + friendDS.get('uid')
              : friendDS.get('uid') + "-" + userDS.get('uid')
            navigation.navigate('MainStack')
            dispacth(setHeader({
              header: item.username
            }))
            dispacth(setId({
              id: chatUid
            }))
          });
        });
      });
    })
  }


  return (
    <SafeAreaView style={styles.container} >
      <View>
        {sentRequests.length || pendingRequests.length ? <Text style={styles.header_text}>Bekleyen istekler</Text> : null}
        <FlatList
          data={sentRequests}
          renderItem={({ item }) => (
            <FriendsCard item={item}
              onCancel={() => { handleRequestCancel(item) }} />
          )} />
        <FlatList
          data={pendingRequests}
          renderItem={({ item }) => (
            <FriendsCard item={item}
              onCancel={() => { handleRequestCancel(item) }}
              onAccept={() => { handleRequestAccept(item) }} />
          )} />
        {friendList.length ? <Text style={styles.header_text}>Arkadaşlar</Text> : null}
        <FlatList
          data={friendList}
          renderItem={({ item }) => (
            <FriendsCard item={item} onMessage={() => { handleMessageSend(item) }} />
          )} />
      </View>
      <SendMessageModal
        visible={sendMessageVisible}
        onClose={handleSendMessageVisible} />
    </SafeAreaView>
  )
}
export default Friends