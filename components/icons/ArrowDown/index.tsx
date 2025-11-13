// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const ArrowDown = ({
  width = 15,
  height = 18,
  color = '#1E1E2D',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 15 18" fill="none">
    <Path
      d="M7.23584 16.9892V0.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M0.75 10.4849L7.22508 17.0022L13.7002 10.4849"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowDown;
