import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";

export default StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    flex: 1,
    backgroundColor: Color.DcGray
  },
  bottom_container: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    backgroundColor: Color.DarkGray1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  mid_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_container: {
    backgroundColor: Color.DarkGray2,
    flexDirection: 'row',
    height: 70,
    paddingTop: 20,
  },
  header_text: {
    alignSelf: 'center',
    color: Color.TextWhite,
    fontSize: 18
  },
  header_ed: {
    alignSelf: 'center',
    marginRight: 7,
    marginLeft: 28,
    marginBottom: 5,
    fontSize: 20,
    color: Color.TextGray
  },
})