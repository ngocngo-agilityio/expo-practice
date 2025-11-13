// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const ArrowUp = ({
  width = 15,
  height = 18,
  color = '#1E1E2D',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 15 18" fill="none">
    <Path
      d="M7.23584 0.762939V17.0021"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M0.75 7.26733L7.22508 0.75L13.7002 7.26733"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowUp;
