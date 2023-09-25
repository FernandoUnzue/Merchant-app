import * as React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const TrashIcon = ({
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
    <G fill={color} data-name="vuesax/bulk/trash">
      <Path d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.334 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2a.748.748 0 1 0 .14 1.49l2.04-.2a79.729 79.729 0 0 1 15.82.21h.08a.757.757 0 0 0 .75-.68.766.766 0 0 0-.69-.82Z" />
      <Path
        data-name="Vector"
        d="M19.228 8.14a1.264 1.264 0 0 0-.91-.39H5.68a1.248 1.248 0 0 0-.91.39 1.288 1.288 0 0 0-.342.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25a1.3 1.3 0 0 0-.34-.95Z"
        opacity={0.399}
      />
      <Path
        data-name="Vector (Stroke)"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75Zm-.83-4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
      />
    </G>
  </Svg>
);
export default TrashIcon;
