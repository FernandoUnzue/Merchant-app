import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Defs, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const WarningIcon = ({
    color = '#ff5000',
    size = 25,
    styles,
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle;
  }) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17.54 17.54"
    width={size}
    height={size}
    style={{
        ...styles
    }}
  >
    <Defs></Defs>
    <Circle style={{
        fill:'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    }} cx={8.77} cy={8.77} r={8.27} />
    <Path  style={{
        fill:'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    }} d="M8.77 4.72v4.91" />
    <Circle
      cx={8.77}
      cy={11.98}
      r={0.85}
      style={{
        fill: color,
      }}
    />
  </Svg>
);
export default WarningIcon;
