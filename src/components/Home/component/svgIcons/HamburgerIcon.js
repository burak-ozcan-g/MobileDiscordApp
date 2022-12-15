import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HamBurgerIcon(props) {
  return (
    <Svg
      width={64}
      height={48}
      viewBox="0 0 64 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="white" d="M0 5h64M0 43h64M0 23h64" stroke="#fff" strokeWidth={10} />
    </Svg>
  )
}

export default HamBurgerIcon