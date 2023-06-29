import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const HelpIcon = ({
    color = '#9b9b9b',
    size = 25,
    styles
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle
  }) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24.09 24.09"
    accessibilityRole="image"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Defs></Defs>
    <Path
      style={{
        fill:'none',
        stroke:color,
        strokeLinecap: 'round',
        strokeLinejoin:'round'
      }}
      d="M8.69 10c0-1.88 1.55-3.4 3.45-3.35 1.75.05 3.21 1.51 3.26 3.26a3.36 3.36 0 0 1-3.35 3.45v2.42"
    />
    <Path
      d="M12.05 16.89a.37.37 0 1 0-.002.738.37.37 0 0 0 .002-.738Z"
      style={{
        fill: color,
      }}
    />
    <Path
         style={{
            fill:'none',
            stroke:color,
            strokeLinecap: 'round',
            strokeLinejoin:'round'
          }}
      d="M22.04 17.8c1.22-2.1 1.8-4.62 1.45-7.29-.69-5.27-5.03-9.46-10.32-9.96C5.91-.13-.13 5.91.55 13.17c.5 5.29 4.68 9.63 9.96 10.32 2.68.35 5.19-.23 7.3-1.45l4.75 1.27c.46.12.88-.3.76-.76l-1.27-4.75Z"
    />
  </Svg>
);
export default HelpIcon;
