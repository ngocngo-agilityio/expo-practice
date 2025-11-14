// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const PieChart = ({
  width = 20,
  height = 20,
  color = '#8B8B94',
}: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.75 7.75C18.75 3.884 15.616 0.75 11.75 0.75V7.75H18.75Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.25 3.75C4.108 3.75 0.75 7.108 0.75 11.25C0.75 15.392 4.108 18.75 8.25 18.75C12.392 18.75 15.75 15.392 15.75 11.25H8.25V3.75Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default PieChart;
