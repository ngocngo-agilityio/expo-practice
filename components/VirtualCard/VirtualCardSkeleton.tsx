import { ImageBackground } from 'expo-image';
import { View } from 'react-native';

// Components
import { SkeletonItem } from '@/components';
import { TSkeletonItemProps } from '../SkeletonItem';

// Styles
import { styles } from './styles';

const Skeleton = ({ ...rest }: TSkeletonItemProps) => (
  <SkeletonItem
    {...rest}
    lightColor="rgba(255, 255, 255, 0.8)"
    darkColor="rgba(255, 255, 255, 0.8)"
  />
);

const VirtualCardSkeleton = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/virtual-card-bg.png')}
      style={styles.container}
      imageStyle={styles.bgImage}>
      {/* Top row skeleton */}
      <View style={styles.topRow}>
        <Skeleton width={40} height={30} />
        <Skeleton width={40} height={30} />
      </View>

      {/* Card Numbers skeleton */}
      <View style={styles.numberRow}>
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} width={60} height={20} />
        ))}
      </View>

      {/* Holder Name skeleton */}
      <Skeleton width={120} height={15} style={{ marginTop: 12 }} />

      {/* Expiry + CVV skeleton */}
      <View style={styles.infoRow}>
        <View>
          <Skeleton width={50} height={10} />
          <Skeleton width={40} height={13} style={{ marginTop: 4 }} />
        </View>

        <View style={styles.infoBlock}>
          <Skeleton width={50} height={10} />
          <Skeleton width={40} height={13} style={{ marginTop: 4 }} />
        </View>

        {/* Brand logo + name skeleton */}
        <View style={styles.brandContainer}>
          <Skeleton width={36} height={22} />
          <Skeleton width={50} height={13} style={{ marginTop: 4 }} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default VirtualCardSkeleton;
