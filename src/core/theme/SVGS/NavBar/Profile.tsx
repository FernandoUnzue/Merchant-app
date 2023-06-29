import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const ProfileIcon = ({
  size = 25,
  color = '#000',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.76 20.84"
    width={size}
    height={size}
    style={{
      backgroundColor: 'transparent',
    }}>
    <Path
      d="M.5,20.34c0-5.27,4.65-8.49,10.38-8.49s10.38,3.22,10.38,8.49"
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
    <Circle
      cx={10.88}
      cy={4.7}
      r={4.2}
      style={{
        fill: 'none',
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    />
  </Svg>
);

export default ProfileIcon;
