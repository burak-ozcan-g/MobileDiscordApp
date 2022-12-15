import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Image, Text, TouchableHighlight } from 'react-native'
import styles from './Settings.style'

import SettingsCard from '../../components/Cards/SettingsCard'
import ExitModal from '../../components/modal/ExitModal'

import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import { launchImageLibrary } from 'react-native-image-picker'

const Settings = ({ navigation, route }) => {
  const [image, setImage] = useState(null)
  const [username, setUsername] = useState('')
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const handleLogout = () => {
    setLogoutModalVisible(!logoutModalVisible)
  }

  useEffect(() => {
    handleProfile()
  }, [username])

  const handleProfile = async () => {
    await firestore().collection('Users').where('uid', '==', auth().currentUser.uid).get().then(userQS => {
      userQS.forEach(userDS => {
        setUsername(userDS.get('username'))
      })
    }).then(async () => {
      await storage().ref(username).getDownloadURL().then((result) => {
        if (result != null) {
          setImage(result)
        }
      }).catch(async () => {
        await storage().ref('defaultpp.png').getDownloadURL().then((result) => {
          setImage(result);
        })
      })
    })
  }

  const pickPhotoAndUpload = async () => {
    const result = await launchImageLibrary({ quality: 0.5, mediaType: 'photo' })
    console.log(result.assets[0].uri)
    if (!result.didCancel) {
      await storage().ref(username).putFile(result.assets[0].uri)
        .catch((err) => {
          alert(err)
        }).then(() => {
          handleProfile()
        })
    }
  }

  const handleUserProfile = () => {
    navigation.navigate('UserProfileScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExitModal visible={logoutModalVisible} onClose={handleLogout} />
      <View style={styles.top_container}>
        <TouchableHighlight onPress={pickPhotoAndUpload}>
          <Image style={styles.profile_pic} source={{ uri: image }} />
        </TouchableHighlight>
        <Text style={styles.username}>{username} </Text>
      </View>
      <SettingsCard
        icon={'edit'}
        text={'Kullanıcı Profili'}
        onPress={handleUserProfile}
      />
      <SettingsCard
        icon={'logout'}
        text={'Çıkış Yap'}
        onPress={handleLogout}
      />

    </SafeAreaView>
  )
}
export default Settings