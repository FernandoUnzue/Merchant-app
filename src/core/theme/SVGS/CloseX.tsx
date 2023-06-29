import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

const CloseIcon = ({
    color = '#242422',
    size = 25,
    styles
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle
  }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.28 19.28" 
  
  width={size}
  height={size}
  style={{
    ...styles
  }}
  >
    <Path
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      d="M15.28 15.28 4 4m0 11.28L15.28 4"
    />
  </Svg>
);

export default CloseIcon;
