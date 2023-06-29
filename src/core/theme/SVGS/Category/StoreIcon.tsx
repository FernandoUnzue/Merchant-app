import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const StoreIcon = ({
    color = '#88dad4',
    size = 25,
    styles,
  }: {
    color?: string;
    size?: number;
    styles?: any;
  }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.9 44.63" 
  
  width={size}
  height={size}
  style={{
    ...styles
  }}
  
  >
    <Path
      d="M56.85 19.43v25.2H6.05v-25.2c1.02-.1 2.03-.41 2.92-.92.33-.18.64-.38.94-.61v22.53h11.18V17.49c1.07 1.04 2.47 1.7 4.07 1.91v14.42h27.85V17.9c1.04.84 2.36 1.37 3.84 1.53Z"
      style={{
        fillRule: "evenodd",
        fill: "#35aeb1",
      }}
    />
    <Path
      d="M13.47 0h35.96L62.9 12.31c0 6.89-10.47 6.89-10.47 0 0 6.89-10.5 6.89-10.5 0 0 6.89-10.47 6.89-10.47 0 0 6.89-10.5 6.89-10.5 0 0 6.89-10.5 6.89-10.5 0 0 6.89-10.47 6.89-10.47 0L13.47 0Z"
      style={{
        fill:color,
        fillRule: "evenodd",
      }}
    />
  </Svg>
);

export default StoreIcon;
