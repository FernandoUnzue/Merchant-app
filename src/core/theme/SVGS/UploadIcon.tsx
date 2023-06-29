import * as React from "react";
import { ViewStyle } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
const UploadIcon = ({
    color = '#88dad4',
    size = 25,
    styles,
  }: {
    color?: string;
    size?: number;
    styles?: ViewStyle;
  }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 12.77" 
  
  width={size}
  height={size}
  style={{
    ...styles
  }}
  >
    <Path
      d="M11.26 3.41 8.78.79a.89.89 0 0 0-1.32 0L4.98 3.4M8.12.77v6.7m7.69-.74v2c0 1.94-1.59 3.54-3.54 3.54H4.04C2.1 12.27.5 10.68.5 8.73v-2"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  </Svg>
);
export default UploadIcon;
