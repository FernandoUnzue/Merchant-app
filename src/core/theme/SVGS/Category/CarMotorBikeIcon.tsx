import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CarMotorBikeIcon = ({
  color = '#88dad4',
  size = 25,
  styles,
}: {
  color?: string;
  size?: number;
  styles?: ViewStyle;
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 49.32 37.99"
    width={size}
    height={size}
    style={{
      ...styles,
    }}>
    <Path
      d="M46.45 15.6c-.99-.84 1.19-1.02 1.19-1.02.92 0 1.68-.78 1.68-1.74s-.76-1.74-1.68-1.74h-3.78C41.86 6.69 39.19.48 37.37.25c-2.76-.34-22.65-.34-25.41.01-1.82.23-4.48 6.43-6.48 10.85h-3.8c-.92 0-1.68.78-1.68 1.74s.76 1.74 1.68 1.74c0 0 2.18.18 1.19 1.02-.13.11-.24.22-.33.31-3.11 2.91-2.71 12.89-.84 15.37 1.98 2.62 43.94 2.61 45.93-.01 1.94-2.56 2.31-13.2-1.17-15.67ZM7.74 11.66c.14-.33.29-.67.45-1.03.82-1.84 1.74-3.92 2.62-5.59.7-1.32 1.18-2.05 1.49-2.44.19-.25.47-.4.78-.44 3-.33 20.16-.32 23.16 0 .3.03.58.19.78.43.31.39.8 1.12 1.5 2.44.88 1.67 1.81 3.76 2.62 5.59.16.36.31.7.45 1.03.22.51-.1 1.09-.63 1.15-2.4.27-8.57.87-16.26.87h-.07c-7.69 0-13.86-.59-16.26-.86-.53-.06-.86-.64-.63-1.15Zm-.07 14.3c-1.73 0-3.14-1.45-3.14-3.25s1.4-3.25 3.14-3.25 3.14 1.45 3.14 3.25-1.4 3.25-3.14 3.25Zm33.98 0c-1.73 0-3.14-1.45-3.14-3.25s1.4-3.25 3.14-3.25 3.14 1.45 3.14 3.25-1.4 3.25-3.14 3.25Z"
      style={{
        fill: color,
      }}
    />
    <Path
      d="M39.93 33.85v2.66c0 .82.64 1.48 1.43 1.48h4.7c.89 0 1.61-.75 1.61-1.67v-3.74c-.98.58-2.97.89-7.59 1.25-.07 0-.16.01-.16.02ZM1.66 32.58v3.84c0 .86.68 1.56 1.51 1.56h4.91c.74 0 1.33-.62 1.33-1.38v-2.76s-.1-.01-.16-.02c-4.62-.36-6.6-.67-7.59-1.25Z"
      style={{
        fill: '#35aeb1',
      }}
    />
    <Path
      d="m34.5 22.21-1.47 2.57c-.26.45-.72.72-1.23.72H17.52c-.5 0-.97-.27-1.23-.72l-1.49-2.6c-.34-.59.07-1.33.73-1.33h18.21c.67 0 1.09.76.75 1.36Z"
      style={{
        fill: '#fff',
      }}
    />
  </Svg>
);
export default CarMotorBikeIcon;
