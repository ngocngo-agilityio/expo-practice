// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const CloudUpload = ({
  width = 24,
  height = 25,
  color = '#1E1E2D',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path
      d="M11.6484 23.8333V8.33325"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.14844 12.8333L11.6485 8.15234L15.6484 12.8333"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9817 15.9167H18.755C20.8437 15.9167 22.5467 14.2137 22.5467 12.125C22.5467 10.0363 20.8437 8.33333 18.755 8.33333H18.2837V7.25C18.2837 3.66417 15.3696 0.75 11.7838 0.75C8.55867 0.75 5.885 3.1095 5.378 6.19158C2.80292 6.32267 0.75 8.43408 0.75 11.0417C0.75 13.7338 2.93292 15.9167 5.625 15.9167H7.315"
      stroke="#1E1E2D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloudUpload;
