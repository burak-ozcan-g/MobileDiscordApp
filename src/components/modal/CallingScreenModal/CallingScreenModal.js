import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Text, PermissionsAndroid, Alert, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './CallingScreenModal.style'
import Modal from "react-native-modal";

import { useSelector } from "react-redux";
import Color from "../../../utils/Color";
import CallingButton from "../../CallingButton";

import { Voximplant } from "react-native-voximplant";

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
]

const CallingScreenModal = ({ visible, incomingCall, handleBack, isActive, setActive }) => {
  const headerName = useSelector((state) => state.MainView.header)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const [isIncoming, setIsIncoming] = useState(false)

  const voximplant = Voximplant.getInstance()

  let call = incomingCall
  const endpoint = useRef(null);

  //--------Permissinos-----------///
  useEffect(() => {
    if (!visible) {
      return
    }
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('İzinler verilmedi!')
      } else {
        setPermissionGranted(true)
      }
    }
    if (Platform.OS === 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true)
    }
  }, [visible])
  //--------Permissinos-----------///

  const [callStatus, setCallStatus] = useState('Bağlanıyor...')
  const [caller, setCaller] = useState('');

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    if (!visible) {
      return;
    }
    if (!isActive) {
      console.log('calling')
      const callSettings = {
        video: {
          sendVideo: true,
          receiveVideo: true,
        },
      };

      const makeCall = async () => {
        call = await voximplant.call(headerName, callSettings);
        subscribeToCallEvents();
      };

      const answerCall = async () => {
        console.log('answer')
        subscribeToCallEvents();
        endpoint.current = call.getEndpoints()[0];
        subscribeToEndpointEvent();
        call.answer(callSettings);
      };

      const subscribeToCallEvents = () => {
        call.on(Voximplant.CallEvents.Failed, callEvent => {
          showError(callEvent.reason);
        });
        call.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
          setCallStatus('Aranıyor...');
        });
        call.on(Voximplant.CallEvents.Connected, callEvent => {
          setCallStatus('Bağlandı');
        });
        call.on(Voximplant.CallEvents.Disconnected, callEvent => {
          console.log(' kapan')
          handleBack();
        });

        call.on(
          Voximplant.CallEvents.LocalVideoStreamAdded,
          callEvent => {
            setLocalVideoStreamId(callEvent.videoStream.id);
          },
        );
        call.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
          endpoint.current = callEvent.endpoint;
          subscribeToEndpointEvent();
        });
      };

      const subscribeToEndpointEvent = async () => {
        endpoint.current.on(
          Voximplant.EndpointEvents.RemoteVideoStreamAdded,
          endpointEvent => {
            setRemoteVideoStreamId(endpointEvent.videoStream.id);
          },
        );
      };

      const showError = reason => {
        Alert.alert('Arama Başarısız', `Sebep: ${reason}`, [
          {
            text: 'Tamam',
            onPress: handleBack(),
          },
        ]);
      };

      if (isIncoming) {
        answerCall();
      } else {
        makeCall();
      }

      return () => {
        call.off(Voximplant.CallEvents.Failed);
        call.off(Voximplant.CallEvents.ProgressToneStart);
        call.off(Voximplant.CallEvents.Connected);
        call.off(Voximplant.CallEvents.Disconnected);
      };
    } else {
      console.log('incomingcalling')
      setCallStatus('Gelen Çağrı')
      setCaller(incomingCall.getEndpoints()[0].headerName);
      incomingCall.on(Voximplant.CallEvents.Disconnected, callEvent => {
        console.log('incoming kapan')
        handleBack();
      });

      return () => {
        incomingCall.off(Voximplant.CallEvents.Disconnected);
      };
    }

  }, [permissionGranted, visible, isActive]);

  const onHangupPress = () => {
    call.hangup();
  };
  const onDecline = () => {
    incomingCall.decline();
  };

  const onAccept = () => {
    setIsIncoming(true)
    setActive()
  };
  //-------------***************--------------------------------------------//


  return (
    <SafeAreaView>
      <Modal
        style={styles.modal}
        isVisible={visible}
        statusBarTranslucent={true}
        onBackButtonPress={handleBack}
      >
        <View style={styles.container}>
          <View style={styles.top_container}>
            <Text style={styles.header_ed}>@</Text>
            <Text style={styles.header_text}>{isActive ? caller : headerName}</Text>
          </View>
          <View style={styles.mid_container}>
            <Text style={styles.header_text}> {callStatus} </Text>

          </View>

          {isActive
            ?
            <View style={styles.bottom_container}>
              <CallingButton name={'call'} color={Color.DCGreen} iconColor={Color.TextWhite} onPress={onAccept} />
              <CallingButton name={'call-end'} color={Color.DCRed} iconColor={Color.TextWhite} onPress={onDecline} />
            </View>
            :
            <View style={styles.bottom_container}>
              <CallingButton name={'videocam'} color={Color.IconGray2} iconColor={Color.TextWhite} />
              <CallingButton name={'volume-down'} color={Color.TextWhite} iconColor={Color.DarkGray3} />
              <CallingButton name={'mic'} color={Color.IconGray2} iconColor={Color.TextWhite} />
              <CallingButton name={'call-end'} color={Color.DCRed} iconColor={Color.TextWhite} onPress={onHangupPress} />
            </View>
          }
        </View>
      </Modal>
    </SafeAreaView>
  )
}
export default CallingScreenModal;
