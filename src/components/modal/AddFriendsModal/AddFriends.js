import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from './AddFriends.style'
import Color from "../../../utils/Color";

import Input from "../../Input";
import Button from "../../Button";

import firestore from '@react-native-firebase/firestore'
import auth, { firebase } from '@react-native-firebase/auth'
import flashMessage from "../../../utils/flashMessage";

const AddFriends = ({ navigation }) => {
  const [requestName, setRequestName] = useState("");
  const [pending, setPending] = useState(false);
  const [docId, setDocId] = useState()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Arkadaşlar',
      headerStyle: { backgroundColor: Color.DcGray },
      headerTintColor: 'white',
      animation: 'slide_from_bottom',
    })
  }, [navigation])


  const handleSendRequest = () => {
    firestore().collection('Users').where('username', '==', requestName).get().then(sentQS => {
      if (!sentQS.size) {
        flashMessage('Böyle Bir Kullanıcı Bulunmamaktadır', 'warning');
      }
      sentQS.forEach(sentDS => {
        firestore().collection('Users').where('email', '==', auth().currentUser.email).get().then(senderQS => {
          senderQS.forEach(async senderDS => {
            console.log(senderDS.id)
            console.log(sentDS.id)
            await firestore().collection('Requests').doc(senderDS.id).collection('sentRequests')
              .doc(sentDS.id).set({
                username: await sentDS.get('username'),
                status: 'sent'
              });
            await firestore().collection('Requests').doc(sentDS.id).collection('pendingRequests')
              .doc(senderDS.id).set({
                username: await senderDS.get('username'),
                status: 'pending'
              });
            console.log('istek gönderildi');
            flashMessage('Arkadaşlık İsteği Gönderildi', 'success');
            navigation.navigate('FriendsScreen')
          });
        });
      });
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_text_container}>
        <Text style={styles.header_text_big}>
          Discord'una arkadaşını ekle</Text>
        <Text style={styles.header_text_small}>
          Hem kullanıcı adına hem de etiketine ihtiyacın olacak. Kullanıcı adının büyük-küçük harflere duyarlı olduğunu da unutma.</Text>
      </View>
      <View style={styles.add_container}>
        <Text style={styles.add_text}>Kullanıcı Adıyla Ekle</Text>
        <Input placeholder={'Kullanıcı adı#0000'} onType={setRequestName} />
        <Button text={'Arkadaşlık İsteği Gönder'} onPress={handleSendRequest} />
      </View>
    </SafeAreaView>
  )
}
export default AddFriends;