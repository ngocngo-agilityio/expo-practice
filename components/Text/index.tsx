// Libs
import { memo, PropsWithChildren } from 'react';
import {
  Text as BaseText,
  TextProps as BaseTextProps,
  ColorValue,
  StyleProp,
  useColorScheme,
} from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { textSizes } from './styles';

type TextProps = PropsWithChildren<BaseTextProps> & {
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
  style?: StyleProp<BaseTextProps>;
  color?: ColorValue;
  fontFamily?: string;
};

const Text = ({
  size = 'sm',
  color,
  fontFamily = fontFamilies.primary.regular,
  style,
  children,
  ...props
}: TextProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const themeColors = colors[scheme];
  const resolvedColor = color ?? themeColors.descriptionText;

  return (
    <BaseText
      style={[textSizes[size], { color: resolvedColor, fontFamily }, style]}
      {...props}>
      {children}
    </BaseText>
  );
};

export default memo(Text);
