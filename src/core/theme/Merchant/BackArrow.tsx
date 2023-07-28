import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const BackArrowIcon = ({
  color = '#626af1',
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
    viewBox="0 0 35.863 35.863"
    style={{
      ...styles,
    }}>
    <G fill={color}>
      <Path
        data-name="Rettangolo 2271"
        d="M17.931 2A15.931 15.931 0 0 0 6.666 29.2 15.934 15.934 0 0 0 29.2 6.666 15.827 15.827 0 0 0 17.931 2m0-2A17.931 17.931 0 1 1 0 17.931 17.931 17.931 0 0 1 17.931 0Z"
        opacity={0.174}
      />
      <G data-name="Icon feather-arrow-left">
        <Path
          data-name="Tracciato 76"
          d="M23.083 18.802H12.521a1 1 0 0 1 0-2h10.562a1 1 0 1 1 0 2Z"
        />
        <Path
          data-name="Tracciato 77"
          d="M17.802 24.083a1 1 0 0 1-.707-.293l-5.281-5.281a1 1 0 0 1 0-1.414l5.281-5.281a1 1 0 0 1 1.414 1.414l-4.574 4.574 4.574 4.574a1 1 0 0 1-.707 1.707Z"
        />
      </G>
    </G>
  </Svg>
);
export default BackArrowIcon;
