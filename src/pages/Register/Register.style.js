import { StyleSheet } from 'react-native'
import Color from '../../utils/Color'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DcGray
  },
  text_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  header: {
    fontFamily: 'Uni Sans Bold',
    alignSelf: 'center',
    fontSize: 26,
    color: 'white',
    margin: 5,
  },
  input_container: {
    marginLeft: 15,
    marginRight: 15,
  },
  header_input: {
    fontFamily: 'Uni Sans Bold',
    fontSize: 12,
    marginTop: 3,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },

})