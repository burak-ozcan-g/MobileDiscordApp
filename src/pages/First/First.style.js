import { DarkTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

import Color from '../../utils/Color'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DcGray,
    justifyContent: 'flex-end'
  },
  button_container: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  }

})