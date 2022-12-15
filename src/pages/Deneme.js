import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

const DenemePage = ({ }) => {

  return (
    <SafeAreaView style={{ backgroundColor: 'red' }}>
      <Text>Selam</Text>
    </SafeAreaView>
  )

  //-------querysnapshot
  /*firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
    })
  })*/

  /*firestore()
  .collection('Users')
  .where('username', '==', requestName)
  .get()
  .then(querySnapshot => {
    console.log('User exists: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.get('email'));
      console.log(auth().currentUser.email)
    });
  })*/

  /*--------addfriends
  UsersDB.where('username', '==', requestName).onSnapshot(sentQS => {
      if (!sentQS.size) {
        flashMessage('Böyle Bir Kullanıcı Bulunmamaktadır', 'warning');
      }
      sentQS.forEach(sentDS => {
        UsersDB.where('email', '==', auth().currentUser.email).onSnapshot(senderQS => {
          senderQS.forEach(senderDS => {
            firestore().collection('Requests').doc(senderDS.id).collection('sentRequests')
              .doc(sentDS.id).set({
                username: sentDS.get('username')
              });
            firestore().collection('Requests').doc(sentDS.id).collection('pendingRequests')
              .doc(senderDS.id).set({
                username: senderDS.get('username')
              });
            console.log('istek gönderildi');
            flashMessage('Arkadaşlık İsteği Gönderildi', 'success');
            navigation.navigate('FriendsScreen');
          });
        });
      });
    })
    */
  /*------------Friends.
 */
  /*handlecancelfriendRequest**********-
  if (status === 'sent') {
    firestore().collection('Users').where('email', '==', auth().currentUser.email).onSnapshot(senderQS => {
      senderQS.forEach(senderDS => {
        firestore().collection('Requests').doc(senderDS.id).collection('sentRequests').where('username', '==', item.username)
          .onSnapshot(sentQS => {
            sentQS.forEach(sentDS => {
              firestore().collection('Requests').doc(sentDS.id).collection('pendingRequests').doc(senderDS.id).delete()
              firestore().collection('Requests').doc(senderDS.id).collection('sentRequests').doc(sentDS.id).delete()
            })
          })
      })
    })
  }*/
}
export default DenemePage;