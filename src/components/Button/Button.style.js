import { StyleSheet } from 'react-native'
import Color from '../../utils/Color'

const base_style = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 6,
    marginTop: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
  }
})

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: Color.DcBlue,
    },
    title: {
      ...base_style.title,
      color: Color.TextWhite,
    }
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: Color.LightGray1,
    },
    title: {
      ...base_style.title,
      color: Color.TextWhite,
    }
  }),
}