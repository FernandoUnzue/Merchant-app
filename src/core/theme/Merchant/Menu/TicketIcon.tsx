import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const TicketIcon = ({
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
    <G data-name="vuesax/bulk/receipt-2">
      <Path
        data-name="Vector"
        d="M20 7.04v9.92a8.2 8.2 0 0 1-.5 3.37.076.076 0 0 1-.02.04 1.042 1.042 0 0 1-.85.42 2.8 2.8 0 0 1-1.86-1.09 1.768 1.768 0 0 0-2.8.15l-1.01 1.34a1.83 1.83 0 0 1-1.46.81 1.83 1.83 0 0 1-1.46-.81l-1.02-1.35a1.759 1.759 0 0 0-2.78-.15l-.01.01c-1.13 1.21-2.13 1.39-2.71.67a.076.076 0 0 1-.02-.04 8.2 8.2 0 0 1-.5-3.37V7.04a8.2 8.2 0 0 1 .5-3.37c0-.01 0-.02.02-.03.57-.73 1.58-.55 2.71.66l.01.01a1.759 1.759 0 0 0 2.78-.15l1.02-1.35A1.83 1.83 0 0 1 11.5 2a1.83 1.83 0 0 1 1.46.81l1.01 1.34a1.768 1.768 0 0 0 2.8.15 2.8 2.8 0 0 1 1.86-1.09 1.052 1.052 0 0 1 .85.43c.02.01.02.02.02.03a8.2 8.2 0 0 1 .5 3.37Z"
        fill={color}
        opacity={0.4}
      />
      <Path
        data-name="Vector"
        d="M16 11H8a.755.755 0 0 1-.75-.75A.755.755 0 0 1 8 9.5h8a.755.755 0 0 1 .75.75.755.755 0 0 1-.75.75Z"
        fill={color}
      />
      <G data-name="Group">
        <Path
          data-name="Vector"
          d="M14 14.5H8a.755.755 0 0 1-.75-.75A.755.755 0 0 1 8 13h6a.755.755 0 0 1 .75.75.755.755 0 0 1-.75.75Z"
          fill={color}
        />
      </G>
    </G>
  </Svg>
);
export default TicketIcon;
