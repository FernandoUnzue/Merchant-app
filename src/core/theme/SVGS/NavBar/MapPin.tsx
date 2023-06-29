import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const MapPinIcon = ({
  size = 50,
  color = '#000',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16.5 21"
    width={size}
    height={size}
    style={{
      backgroundColor: '#fff',
    }}>
    <Path
      d="M8.2,.5C4,.5,.5,4,.5,8.2c0,5.2,7.7,12.1,7.7,12.1,0,0,7.8-6.8,7.8-12.1C16,4,12.5,.5,8.2,.5Zm0,12.5c-2.7,0-4.8-2.2-4.8-4.8S5.6,3.4,8.2,3.4s4.8,2.2,4.8,4.8-2.1,4.8-4.8,4.8Z"
      style={{
        fill: 'none',
        stroke: color,
        strokeMiterlimit: 10,
      }}
    />
  </Svg>
);

export default MapPinIcon;
