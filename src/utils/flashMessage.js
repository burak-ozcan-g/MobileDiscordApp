import { showMessage } from 'react-native-flash-message'
import Color from './Color';

export default function (message, icon) {
  showMessage({
    message: message,
    icon: icon,
    backgroundColor: Color.DarkGray1,
    color: Color.TextWhite,
    style: { margin: 16, borderRadius: 16, borderWidth: 2, borderColor: Color.DarkGray2 },
  });
}