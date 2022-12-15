import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, View, Text, TouchableHighlight } from "react-native";
import Color from "../../utils/Color";
import styles from './UserProfile.style'

import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import { launchImageLibrary } from 'react-native-image-picker'

const UserProfile = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Kullanıcı Profili',
      headerStyle: { backgroundColor: Color.DcGray },
      headerTintColor: 'white',
      animation: 'slide_from_right',
    })
  }, [navigation])

  useEffect(() => {
    getUsername()
    handleProfilePicture()
  }, [username])

  const getUsername = () => {
    console.log('usurneame girdi')
    firestore().collection('Users').where('uid', '==', auth().currentUser.uid).get().then(userQS => {
      userQS.forEach(userDS => {
        setUsername(userDS.get('username'))
        console.log('userne son')
      })
    })
  }
  const handleProfilePicture = () => {
    console.log('picture girdi')
    console.log(username)
    storage().ref(username).getDownloadURL().then((result) => {
      if (result != null) {
        console.log('resutl girdi')
        console.log(result)
        setImage(result)
      }
    }).catch(() => {
      console.log('else girdi')
      storage().ref('defaultpp.png').getDownloadURL().then((result) => {
        console.log(result)
        setImage(result);
      })
    })
  }

  const pickPhotoAndUpload = async () => {
    console.log('nie')
    const result = await launchImageLibrary({ quality: 0.5, mediaType: 'photo' })
    console.log(result.assets[0].uri)
    if (!result.didCancel) {
      await storage().ref(username).putFile(result.assets[0].uri)
        .catch((err) => {
          alert(err)
        }).then(() => {
          handleProfilePicture()
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_container}>
        <TouchableHighlight onPress={pickPhotoAndUpload}>
          <Image style={styles.profile_pic} source={{ uri: image }} />
        </TouchableHighlight>
        <Text style={styles.username}>{username} </Text>
      </View>
    </SafeAreaView>
  )
}
export default UserProfile;