import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const UnderlineIcon = ({
  color = '#88dad4',
  size = 25,
  styles,
  width,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
  width?: number | string;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 149.8 4.06"
    accessibilityRole="image"
    width={width ? width : '100%'}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      style={{
        fill: color,
      }}
      d="M149.8 2.71 0 4.06V0h142.74l7.06 2.71z"
    />
  </Svg>
);
export default UnderlineIcon;
