// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const MapPin = ({ width = 22, height = 22, color = '#1E1E2D' }: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
    <Path
      d="M11 12.8333C13.1167 12.8333 14.8333 11.1167 14.8333 9C14.8333 6.88333 13.1167 5.16667 11 5.16667C8.88333 5.16667 7.16667 6.88333 7.16667 9C7.16667 11.1167 8.88333 12.8333 11 12.8333Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 2.75C7.79167 2.75 5.16667 5.375 5.16667 8.58333C5.16667 13.75 11 19.25 11 19.25C11 19.25 16.8333 13.75 16.8333 8.58333C16.8333 5.375 14.2083 2.75 11 2.75Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapPin;
