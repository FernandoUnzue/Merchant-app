import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Rect } from "react-native-svg";
const PointIcon = ({
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
    viewBox="0 0 8.63 8.63"
    accessibilityRole="image"
   width={size}
   height={size}
   style={{
    ...styles
   }}
  >
    <Rect
      width={8.63}
      height={8.63}
      rx={2}
      ry={2}
      style={{
        fill: color,
      }}
    />
  </Svg>
);
export default PointIcon;
