// Libs
import Svg, { Path } from 'react-native-svg';

// Types
import { TIconProps } from '@/types';

const Search = ({ width = 20, height = 20, color = '#A2A2A7' }: TIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M13.0947 5.6985C15.1371 7.74094 15.1371 11.0524 13.0947 13.0948C11.0522 15.1373 7.74078 15.1373 5.69834 13.0948C3.65589 11.0524 3.65589 7.74094 5.69834 5.6985C7.74078 3.65606 11.0522 3.65606 13.0947 5.6985Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8335 15.8333L13.0918 13.0917"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Search;
