import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const BagIcon = ({
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
    <G fill={color} data-name="vuesax/bulk/bag">
      <Path
        d="M19.24 5.579h-.4l-3.38-3.382a.706.706 0 0 0-.99 0 .706.706 0 0 0 0 .99l2.39 2.39H7.14l2.39-2.39a.706.706 0 0 0 0-.99.706.706 0 0 0-.99 0L5.17 5.579h-.4c-.9 0-2.77 0-2.77 2.56a2.726 2.726 0 0 0 .62 2.03 1.614 1.614 0 0 0 .84.45 3.867 3.867 0 0 0 .9.08h15.28a4.176 4.176 0 0 0 .88-.08c.84-.2 1.48-.8 1.48-2.48 0-2.559-1.87-2.56-2.76-2.56Z"
        opacity={0.4}
      />
      <Path
        data-name="Vector"
        d="M19.65 10.7H4.36a3.867 3.867 0 0 1-.9-.08l1.26 7.68C5 20.02 5.75 22 9.08 22h5.61c3.37 0 3.97-1.69 4.33-3.58l1.51-7.8a4.238 4.238 0 0 1-.88.08Zm-9.04 6.46a.7.7 0 1 1-1.4 0v-3.3a.7.7 0 1 1 1.4 0Zm4.28 0a.7.7 0 1 1-1.4 0v-3.3a.7.7 0 0 1 1.4 0Z"
      />
    </G>
  </Svg>
);
export default BagIcon;
