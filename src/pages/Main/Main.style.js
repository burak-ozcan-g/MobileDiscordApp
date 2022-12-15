import { StyleSheet } from 'react-native'
import Color from '../../utils/Color'

export default StyleSheet.create({
  firstMainContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: Color.DarkGray2
  },
  serverDetailsContainer: {
    paddingLeft: 18,
    paddingRight: 18,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: '69%',
    height: '100%',
    alignSelf: 'flex-end',
    backgroundColor: Color.DarkGray1,
  },
  serverNavContainer: {
    marginTop: 8,
    width: '16%',
    height: '100%',
    alignItems: 'flex-end',
    alignItems: 'center',
    backgroundColor: Color.DarkGray2,
  },
  commonIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.DarkGray1,
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  detail_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  detail_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.TextWhite,
  },

  /*------------------------------------- */
  secondMainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Color.DcGray,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: Color.DarkGray1,
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
  bottom_input: {
    borderTopWidth: 0.7,
    borderTopColor: Color.DarkGray3,
    alignItems: 'center',
    height: 55,
    width: '100%',
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 15,
  },
  msg_input: {
    flex: 1,
    backgroundColor: Color.DarkGray2,
    height: 40,
    borderRadius: 15,
  },
  header_text: {
    alignSelf: 'center',
    color: Color.TextWhite,
    fontSize: 16
  },
  header_ed: {
    alignSelf: 'center',
    marginRight: 7,
    marginLeft: 8,
    marginBottom: 5,
    fontSize: 18,
    color: Color.TextGray
  },
  message_list: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,
    flexDirection: 'column-reverse'
  },

  /*------------------------------------- */
  thirdMainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  thirdMainStyle: {
    marginRight: 8,
    width: '83%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '100%',
    alignSelf: 'flex-end',
    backgroundColor: Color.DcGray
  },
})