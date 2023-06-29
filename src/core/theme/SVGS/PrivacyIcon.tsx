import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const PrivacyIcon = ({
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
    viewBox="0 0 25.59 28.7"
    accessibilityRole="image"
   width={size/2}
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
        strokeLinecap:'round',
        strokeLinejoin:'round'
      }}
      d="M15.57 27.05c.64.45 1.37.82 2.21 1.09a1.256 1.256 0 0 0 .76 0c6.61-2.1 6.65-10.68 6.51-13.25-.02-.38-.2-.74-.49-.98-.27-.22-.61-.32-.95-.27-2.37.35-3.73-.82-4.47-1.45l-.17-.15c-.47-.39-1.16-.39-1.63 0l-.14.12c-.35.3-.89.76-1.64 1.09"
    />
    <Path
       style={{
        fill:'none',
        stroke:color,
        strokeLinecap:'round',
        strokeLinejoin:'round'
      }}
      d="M11.27 14.89c.02-.38.2-.74.49-.98.27-.22.61-.32.95-.27 1.17.17 2.11-.04 2.85-.38V1.54c0-.57-.47-1.04-1.04-1.04H1.54C.97.5.5.97.5 1.54v25.62c0 .57.47 1.04 1.04 1.04h12.99c.57 0 1.04-.47 1.04-1.04v-.11c-4.4-3.1-4.42-9.91-4.3-12.16Z"
    />
    <Path
       style={{
        fill:'none',
        stroke: color,
        strokeLinecap:'round',
        strokeLinejoin:'round'
      }}
      d="M15.57 13.26c-.74.34-1.69.55-2.85.38-.34-.05-.68.04-.95.27-.29.24-.47.59-.49.98-.13 2.25-.11 9.07 4.3 12.16M.5 4.83h15.07M.5 23.87h12.31"
    />
  </Svg>
);
export default PrivacyIcon;
