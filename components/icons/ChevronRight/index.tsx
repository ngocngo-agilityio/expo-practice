// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const ChevronRight = ({
  width = 18,
  height = 18,
  color = '#7E848D',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path
      d="M6.75 3.75L11.25 9L6.75 14.25"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronRight;
