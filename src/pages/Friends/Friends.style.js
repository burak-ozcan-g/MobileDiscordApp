import { StyleSheet } from 'react-native'
import Color from '../../utils/Color'

export default StyleSheet.create({
  container: {
    backgroundColor: Color.DcGray,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header_text: {
    marginTop: 15,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})