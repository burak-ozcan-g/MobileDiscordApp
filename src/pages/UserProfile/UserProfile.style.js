import { StyleSheet } from "react-native";
import Color from "../../utils/Color";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DcGray,
  },
  top_container: {
    height: 220,
    width: '100%',
    backgroundColor: Color.DarkGray3,
    marginBottom: 20,
    justifyContent: 'center'
  },
  profile_pic: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Color.DarkGray2,
    margin: 20,
  },
  username:{
    color: Color.TextWhite,
    fontSize: 22,
    marginLeft: 30,
    fontWeight: 'bold'
  }
})