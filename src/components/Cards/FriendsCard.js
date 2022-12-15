import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Color from "../../utils/Color";

import MiniButton from "../MiniButton";

import storage from '@react-native-firebase/storage'

const FriendsCard = ({ item, onCancel, onAccept, onMessage }) => {
  const [image, setImage] = useState(null)
  let status = item.status
  let statusMessage = ''

  if (status === 'pending') statusMessage = 'kullanıcısından gelen arkadaşlık isteği'
  else if (status === 'sent') statusMessage = 'bekleyen arkadaşlık isteği'

  useEffect(() => {
    handleProfilePicture()
  }, [])

  const handleProfilePicture = async () => {
    await storage().ref(item.username).getDownloadURL().then((result) => {
      if (result != null) {
        setImage(result)
      }
    }).catch(async () => {
      await storage().ref('defaultpp.png').getDownloadURL().then((result) => {
        console.log(result)
        setImage(result);
      })
    })
  }

  return (
    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image style={{ height: 40, width: 40, borderRadius: 20, margin: 5, }} source={{ uri: image }} />
        <View>
          <Text style={{ color: Color.TextWhite, fontSize: 15, fontWeight: 'bold' }}> {item.username} </Text>
          <Text style={{ fontSize: 12, }}> {statusMessage} </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {status != 'friend' ? <MiniButton icon={'close'} color={Color.DarkGray1} onPress={onCancel} /> : null}
        {status == 'pending' ? <MiniButton icon={'check'} color={Color.DCGreen} onPress={onAccept} /> : null}
        {status == 'friend' ? <MiniButton icon={'chat-bubble'} color={Color.DarkGray1} onPress={onMessage} /> : null}
      </View>
    </View>
  )
}
export default FriendsCard;
