// Components
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, useColorScheme, ViewStyle } from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

export type TSkeletonItemProps = {
  width: number;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
  animated?: boolean;
};

const SkeletonItem = ({
  width,
  height,
  borderRadius = 4,
  style,
  lightColor = 'rgba(0, 0, 0, 0.08)',
  darkColor = 'rgba(255, 255, 255, 0.8)',
  animated = true,
}: TSkeletonItemProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const color = scheme === ThemeScheme.Light ? lightColor : darkColor;

  const animatedValue = useRef(new Animated.Value(0)).current;

  /** Animation shimmer */
  useEffect(() => {
    if (!animated) return;

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
  }, [animated, animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: animated ? [0.25, 0.55] : [0.3, 0.3],
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
        colors={[color, color]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

export default SkeletonItem;
