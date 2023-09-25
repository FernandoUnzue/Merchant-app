import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const MenuBurguer = ({
  color = '#173e46',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20.15 14.1"
    style={{
      ...styles,
    }}>
    <G
      data-name="Icon feather-menu"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path data-name="Tracciato 166" d="M1 7.05h18.15" />
      <Path data-name="Tracciato 167" d="M1 1h18.15" />
      <Path data-name="Tracciato 168" d="M1 13.1h18.15" />
    </G>
  </Svg>
);
export default MenuBurguer;
