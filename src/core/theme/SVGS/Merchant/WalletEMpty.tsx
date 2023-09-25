import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const WalletIcon = ({
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
    viewBox="0 0 20.604 20.604"
    style={{
      ...styles,
    }}>
    <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15.487 11.632a1.724 1.724 0 0 0-.515 1.4 1.831 1.831 0 0 0 1.854 1.605h1.631v1.022a3.235 3.235 0 0 1-3.228 3.228H5.374a3.235 3.235 0 0 1-3.228-3.228V9.881a3.235 3.235 0 0 1 3.228-3.228h9.856a3.235 3.235 0 0 1 3.228 3.228v1.236h-1.734a1.711 1.711 0 0 0-1.237.515Z" />
      <Path
        data-name="Vector"
        d="M2.146 10.656V6.731a2.445 2.445 0 0 1 1.58-2.293l6.82-2.575a1.631 1.631 0 0 1 2.2 1.528v3.265m6.618 5.338v1.768a.881.881 0 0 1-.859.876h-1.679a1.831 1.831 0 0 1-1.854-1.606 1.724 1.724 0 0 1 .515-1.399 1.711 1.711 0 0 1 1.236-.515h1.786a.881.881 0 0 1 .855.876ZM6.01 10.302h6.01"
      />
    </G>
  </Svg>
);
export default WalletIcon;
