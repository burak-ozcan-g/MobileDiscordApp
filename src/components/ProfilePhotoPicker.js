import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

const profilePhotoPicker = ({ username }) => {
  const pickPhotoAndUpload = async () => {
    const result = await launchImageLibrary({ quality: 0.5, mediaType: 'photo' })
    console.log(result.assets[0].uri)
    if (!result.didCancel) {
      await storage().ref(username).putFile(result.assets[0].uri)
        .catch((err) => {
          alert(err)
        })
    }
  }
  return (
    pickPhotoAndUpload()
  )
}
export default profilePhotoPicker;