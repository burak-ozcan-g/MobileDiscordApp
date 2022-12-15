import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import firestore from '@react-native-firebase/firestore'
import Color from "../../utils/Color";

import { tr } from 'date-fns/locale'
import { formatDistance, parseISO } from 'date-fns'

import storage from '@react-native-firebase/storage'

const MessageCard = ({ item }) => {
  const [image, setImage] = useState(null)
  const [username, setUsername] = useState('')

  const formattedDate = formatDistance(parseISO(item.date), new Date(), {
    addSuffix: true,
    locale: tr,
  })

  const [name, setName] = useState('')

  useEffect(() => {
    handleSenderPicture()
  }, [])

  const handleSenderPicture = async () => {
    console.log('picture girdi')
    console.log(item.username)
    await storage().ref(item.username).getDownloadURL().then((result) => {
      if (result != null) {
        console.log('resutl girdi')
        console.log(result)
        setImage(result)
      }
    }).catch(async () => {
      console.log('else girdi')
      await storage().ref('defaultpp.png').getDownloadURL().then((result) => {
        console.log(result)
        setImage(result);
      })
    })
  }


  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image style={{ height: 35, width: 35, borderRadius: 20, margin: 5, }} source={{ uri: image }} />
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text style={{ color: Color.TextWhite, fontSize: 16 }}> {item.username} </Text>
          <Text style={{ fontSize: 13 }}> {item.message} </Text>
        </View>
      </View>
      <Text style={{ fontSize: 12 }}> {formattedDate} </Text>
    </View>
  )
}
export default MessageCard;