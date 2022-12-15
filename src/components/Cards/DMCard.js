import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import Color from "../../utils/Color";

import storage from '@react-native-firebase/storage'

const DMCard = ({ item, onPress, navigation }) => {
  const [image, setImage] = useState(null)
  let statusMessage = ''

  useEffect(() => {
    handleProfilePicture()
  }, [navigation])

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
    <TouchableHighlight style={{ justifyContent: 'center' }} underlayColor={Color.LightGray2} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ height: 40, width: 40, borderRadius: 20, margin: 5, }} source={{ uri: image }} />
        <View style={{ marginTop: 10, marginBottom: 10, }}>
          <Text style={{ color: Color.TextGray, fontSize: 15, fontWeight: 'bold' }}> {item.username} </Text>
          {statusMessage.length ? <Text style={{ fontSize: 12, }}> {statusMessage} </Text> : null}
        </View>
      </View>

    </TouchableHighlight>
  )
}
export default DMCard;
