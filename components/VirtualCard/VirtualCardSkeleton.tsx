import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

// Styles
import { styles } from './styles';

const SkeletonItem = ({
  width,
  height,
  borderRadius = 4,
  style,
}: {
  width: number;
  height: number;
  borderRadius?: number;
  style?: any;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.4],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
          overflow: 'hidden',
        },
        style,
      ]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.4)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

const VirtualCardSkeleton = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/virtual-card-bg.png')}
      style={styles.container}
      imageStyle={styles.bgImage}>
      {/* Top row skeleton */}
      <View style={styles.topRow}>
        <SkeletonItem width={40} height={30} />
        <SkeletonItem width={40} height={30} />
      </View>

      {/* Card Numbers skeleton */}
      <View style={styles.numberRow}>
        {[1, 2, 3, 4].map(i => (
          <SkeletonItem key={i} width={60} height={20} />
        ))}
      </View>

      {/* Holder Name skeleton */}
      <SkeletonItem width={120} height={15} style={{ marginTop: 12 }} />

      {/* Expiry + CVV skeleton */}
      <View style={styles.infoRow}>
        <View>
          <SkeletonItem width={50} height={10} />
          <SkeletonItem width={40} height={13} style={{ marginTop: 4 }} />
        </View>

        <View style={styles.infoBlock}>
          <SkeletonItem width={50} height={10} />
          <SkeletonItem width={40} height={13} style={{ marginTop: 4 }} />
        </View>

        {/* Brand logo + name skeleton */}
        <View style={styles.brandContainer}>
          <SkeletonItem width={36} height={22} />
          <SkeletonItem width={50} height={13} style={{ marginTop: 4 }} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default VirtualCardSkeleton;
