// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const Clock = ({ width = 18, height = 17, color = '#1E1E2D' }: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 18 17" fill="none">
    <Path
      d="M10.7601 10.3153L7.7168 8.5045V4.577"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.2924 12.4456C12.9366 14.3815 10.6933 15.6498 8.1499 15.6498"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.1499 15.65C4.0074 15.65 0.649902 12.2925 0.649902 8.14999"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M0.649902 8.14999C0.649902 4.00749 4.0074 0.649994 8.1499 0.649994C11.4158 0.649994 14.1937 2.73689 15.2232 5.64999"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.1919 5.74421L15.5084 7.03461L16.7988 4.71811"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Clock;
