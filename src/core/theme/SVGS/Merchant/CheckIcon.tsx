import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
const CheckIcon = ({
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
    viewBox="0 0 36 36"
    style={{
      ...styles,
    }}>
    <G transform="translate(-337 -141)">
      <Circle
        data-name="Ellisse 13"
        cx={18}
        cy={18}
        r={18}
        transform="translate(337 141)"
        fill={color}
      />
      <Path
        d="M352.824 163.375a.893.893 0 0 1-.632-.262l-2.61-2.611a.893.893 0 0 1 0-1.263.893.893 0 0 1 1.263 0l1.98 1.98 6.331-6.332a.893.893 0 0 1 1.263 0 .893.893 0 0 1 0 1.263l-6.963 6.963a.893.893 0 0 1-.632.262Z"
        fill="#fff"
      />
    </G>
  </Svg>
);
export default CheckIcon;
