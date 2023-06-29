import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const PlusIcon = ({
    color = '#88dad4',
    size = 25,
    styles
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle
  }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13.55 13.55"
    accessibilityRole="image"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Path
      d="M6.77.5v12.55M.5 6.77h12.55"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  </Svg>
);
export default PlusIcon;
