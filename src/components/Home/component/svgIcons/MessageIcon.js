import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MessageIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477.867 477.867"
      {...props}
    >
      <Path d="M426.667.002H51.2C22.923.002 0 22.925 0 51.202v273.067c0 28.277 22.923 51.2 51.2 51.2h60.587l-9.284 83.456c-1.035 9.369 5.721 17.802 15.09 18.837a17.07 17.07 0 0013.292-4.279l108.919-98.014h186.863c28.277 0 51.2-22.923 51.2-51.2V51.202c0-28.277-22.923-51.2-51.2-51.2z" />
    </Svg>
  )
}

export default MessageIcon