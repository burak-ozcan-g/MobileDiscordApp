import React from "react";
import { FlatList, SafeAreaView, Text, TextInput, View, Pressable } from "react-native";
import styles from './SendMessageModal.style'
import Color from "../../../utils/Color";
import Modal from "react-native-modal";

const SendMessageModal = ({ visible, onClose }) => {

  return (
    <SafeAreaView>
      <Modal
        style={styles.modal}
        isVisible={visible}
        swipeDirection='down'
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        statusBarTranslucent={true}
        >
        <SafeAreaView style={styles.container}>
          <View style={styles.info_container}>
            <Text style={styles.info_text}
            >Mesaj atmak için arkadaşlarını davet et</Text>
          </View>
          <View style={styles.search_container}>
            <TextInput style={styles.search_input}
              selectionColor={Color.TextWhite}
              placeholder={'Arkadaşlarını ara'} />
            <Pressable style={styles.search_button}>
              <Text style={styles.search_button_text}>Başla</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}
export default SendMessageModal;

