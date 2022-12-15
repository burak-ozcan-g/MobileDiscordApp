import { StyleSheet, Dimensions } from "react-native";
import Color from "../../../utils/Color";

const deviceSize = Dimensions.get('window')

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: Color.DcGray,
    height: deviceSize.height / 10 * 9
  },
  info_container: {
    backgroundColor: Color.DarkGray2,
    padding: 15
  },
  info_text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Color.TextWhite
  },
  search_container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  search_input: {
    backgroundColor: Color.DarkGray2,
    width: deviceSize.width / 5 * 3,
    padding: 7,
    margin: 10,
    borderRadius: 5,
    sele: Color.TextWhite,
  },
  search_button: {
    backgroundColor: Color.LightGray2,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  search_button_text: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.TextGray,
  }
})