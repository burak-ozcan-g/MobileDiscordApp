import React from "react";
import { SafeAreaView, View, Text, Dimensions } from "react-native";
import Modal from 'react-native-modal'
import Button from '../Button'

import auth from '@react-native-firebase/auth'
import Color from "../../utils/Color";

import { useDispatch } from "react-redux";
import { setId, setHeader } from "../../context/MainViewProvider/MainViewSlice";

const ExitModal = ({ visible, onClose }) => {
  const dispacth = useDispatch()

  const logOut = () => {
    auth().signOut();
    dispacth(setHeader({
      header: '',
    }))
    dispacth(setId({
      id: '',
    }))
  }

  return (
    <Modal style={{ margin: 15 }}
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      statusBarTranslucent={true}
    >
      <View style={{ padding: 15, backgroundColor: Color.DcGray, borderRadius: 7, }}>
        <Text style={{ color: Color.TextWhite, fontSize: 17, fontWeight: 'bold' }}>Çıkış Yap</Text>
        <Text style={{ marginTop: 15, marginBottom: 15 }}>Çıkış Yapmak istediğine emin misin?</Text>
        <Button text={'Çıkış Yap'} onPress={() => { logOut() }} />
        <Button text={'İptal'} onPress={onClose} theme={'secondary'} />
      </View>
    </Modal>
  )
}
export default ExitModal;