import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const ClientIcon = ({
  color = '#ed7652',
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
    viewBox="0 0 24 24"
    style={{
      ...styles,
    }}>
    <G fill={color} data-name="vuesax/bulk/profile-circle">
      <Path d="M22 12.01a10 10 0 1 1-10-10 10 10 0 0 1 10 10Z" opacity={0.4} />
      <Path
        data-name="Vector"
        d="M12 6.94a3.745 3.745 0 0 0-.05 7.49h.18A3.746 3.746 0 0 0 12 6.94Zm6.78 12.42A9.976 9.976 0 0 1 12 22.015a9.976 9.976 0 0 1-6.78-2.655 4.275 4.275 0 0 1 1.84-2.38 9.622 9.622 0 0 1 9.88 0 4.231 4.231 0 0 1 1.84 2.38Z"
      />
    </G>
  </Svg>
);
export default ClientIcon;
