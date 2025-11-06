// Libs
import { memo, PropsWithChildren } from 'react';
import {
  Text as BaseText,
  TextProps as BaseTextProps,
  ColorValue,
  StyleProp,
} from 'react-native';

// Themes
import { colors, fontFamilies } from '@/themes';

// Styles
import { textSizes } from './styles';

type TextProps = PropsWithChildren<BaseTextProps> & {
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
  style?: StyleProp<BaseTextProps>;
  color?: ColorValue;
  fontFamily?: string;
};

const Text = ({
  size = 'md',
  color = colors.descriptionText,
  fontFamily = fontFamilies.primary.regular,
  style,
  children,
  ...props
}: TextProps) => {
  return (
    <BaseText
      style={[textSizes[size], { color, fontFamily }, style]}
      {...props}>
      {children}
    </BaseText>
  );
};

export default memo(Text);
