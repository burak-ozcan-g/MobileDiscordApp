import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";

export default StyleSheet.create({
  container: {
    backgroundColor: Color.DcGray,
    flex: 1,
  },
  add_container: {
    padding: 15,
    marginTop: 20,
  },
  header_text_container: {
    alignItems: 'center',
    padding: 15,
  },
  header_text_big: {
    fontSize: 27,
    fontWeight: 'bold',
    color: Color.TextWhite,
    margin: 10,
  },
  header_text_small: {
    fontSize: 14,
    textAlign: 'center',
    color: Color.TextGray,
  },
  add_text: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  }
})
