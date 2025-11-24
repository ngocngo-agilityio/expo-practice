// Lib
import { useRouter } from 'expo-router';
import { memo, ReactNode } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

// Components
import { Text } from '@/components';
import { ArrowLeftIcon } from '@/components/icons';

// Constants
import { ThemeScheme } from '@/constants';

// Themes
import { BASE_COLORS } from '@/themes';

// Styles
import { createAppHeaderStyles } from './styles';

type TAppHeaderProps = {
  title?: string;
  hasBackButton?: boolean;
  rightIcon?: ReactNode;
  onPressRight?: () => void;
};

const AppHeader = ({
  title = '',
  hasBackButton = true,
  rightIcon,
  onPressRight,
}: TAppHeaderProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createAppHeaderStyles(scheme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {hasBackButton && (
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => router.back()}
          accessibilityLabel="Go back">
          <ArrowLeftIcon
            color={
              scheme === ThemeScheme.Dark
                ? BASE_COLORS.white
                : BASE_COLORS.darkGunmetal
            }
          />
        </TouchableOpacity>
      )}

      {title && (
        <Text size="md" pointerEvents="none" style={styles.title}>
          {title}
        </Text>
      )}

      {rightIcon && (
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={onPressRight}
          accessibilityLabel="Right action">
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(AppHeader);
