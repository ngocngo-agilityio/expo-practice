// Libs
import Svg, { Circle, Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const UserEdit = ({
  width = 22,
  height = 22,
  color = '#1E1E2D',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
    <Path
      d="M9.16667 13.75H6.41667C4.39162 13.75 2.75 15.3916 2.75 17.4167V18.3333"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.333 19.25H12.833"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.1015 14.0565L15.8896 11.2685C16.0615 11.0966 16.2946 11 16.5377 11C16.7809 11 17.014 11.0966 17.1859 11.2685L18.0645 12.1471C18.4225 12.5051 18.4225 13.0855 18.0645 13.4435L15.2765 16.2315C15.1046 16.4034 14.8714 16.5 14.6283 16.5H13.2913C13.0382 16.5 12.833 16.2948 12.833 16.0417V14.7047C12.833 14.4616 12.9296 14.2285 13.1015 14.0565Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="10.0837"
      cy="6.41667"
      r="3.66667"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserEdit;
