import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
const UserIcon = ({
  color = '#f7f8f2',
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
    viewBox="0 0 43 43"
    style={{
      ...styles,
    }}>
    <G transform="translate(-36 -322)">
      <Circle
        data-name="Ellisse 4"
        cx={21.5}
        cy={21.5}
        r={21.5}
        transform="translate(36 322)"
        fill="#173e46"
      />
      <Path
        d="M62.251 338.75a4.75 4.75 0 1 1-4.75-4.75 4.75 4.75 0 0 1 4.75 4.75Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Vector"
        d="M65.661 353c0-3.676-3.658-6.65-8.161-6.65s-8.16 2.974-8.16 6.65"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </G>
  </Svg>
);
export default UserIcon;
