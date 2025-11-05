// Libs
import { PropsWithChildren, memo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { buttonBaseStyles, buttonSizes, createButtonStyles } from './styles';

type ButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  title: string;
  variant?: 'solid';
  size?: 'md';
  disabled?: boolean;
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const Button = ({
  title,
  variant = 'solid',
  size = 'md',
  disabled = false,
  isLoading = false,
  style,
  titleStyle,
  accessibilityLabel = '',
  accessibilityHint = '',
  ...rest
}: ButtonProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const buttonVariants = createButtonStyles(scheme);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        buttonBaseStyles.button,
        buttonVariants[variant].button,
        buttonSizes[size].button,
        style,
        { ...(disabled && { opacity: 0.75 }) },
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled, busy: isLoading }}
      accessibilityHint={accessibilityHint}
      {...rest}>
      <Text
        style={[
          buttonBaseStyles.title,
          buttonVariants[variant].title,
          buttonSizes[size].title,
          titleStyle,
        ]}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="white"
          testID="loading-indicator"
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
