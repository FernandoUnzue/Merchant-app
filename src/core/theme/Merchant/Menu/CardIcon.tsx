import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const CardIcon = ({
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
    <G data-name="vuesax/bulk/cards">
      <Path
        data-name="Vector"
        d="M19 10.28v7.15c-.03 2.85-.81 3.57-3.78 3.57H5.78C2.76 21 2 20.25 2 17.27v-6.99c0-2.7.63-3.57 3-3.71.24-.01.5-.02.78-.02h9.44c3.02 0 3.78.75 3.78 3.73Z"
        fill={color}
        opacity={0.4}
      />
      <Path
        data-name="Vector"
        d="M22 6.73v6.99c0 2.7-.63 3.57-3 3.71v-7.15c0-2.98-.76-3.73-3.78-3.73H5.78c-.28 0-.54.01-.78.02C5.03 3.72 5.81 3 8.78 3h9.44C21.24 3 22 3.75 22 6.73ZM6.96 18.56H5.24a.755.755 0 0 1-.75-.75.755.755 0 0 1 .75-.75h1.72a.75.75 0 0 1 0 1.5Z"
        fill={color}
      />
      <G data-name="Group">
        <Path
          data-name="Vector"
          d="M12.55 18.56H9.11a.755.755 0 0 1-.75-.75.755.755 0 0 1 .75-.75h3.44a.75.75 0 0 1 0 1.5Z"
          fill={color}
        />
      </G>
      <G data-name="Group">
        <Path data-name="Vector" d="M2 11.86h17v1.5H2Z" fill={color} />
      </G>
    </G>
  </Svg>
);
export default CardIcon;
