// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const Home = ({ width = 20, height = 20, color = '#0066FF' }: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.75 18.75H5.75C2.9886 18.75 0.75 16.5114 0.75 13.75V8.94998C0.75 7.43108 1.4405 5.99447 2.6265 5.04568L6.6265 1.84567C8.4526 0.384775 11.0474 0.384775 12.8735 1.84567L16.8735 5.04568C18.0596 5.99447 18.75 7.43108 18.75 8.94998V13.75C18.75 16.5114 16.5114 18.75 13.75 18.75Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.0505 13.6682H6.31445"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Home;
