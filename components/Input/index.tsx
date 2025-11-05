// Libs
import { forwardRef, memo, ReactNode } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

// Styles
import { ThemeScheme } from '@/constants';
import { createInputStyles } from './styles';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  leftIcon?: ReactNode;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
  rightIconAccessibilityLabel?: string;
  rightIconAccessibilityHint?: string;
  onIconPress?: () => void;
};

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      containerStyle,
      label = '',
      labelStyle,
      inputWrapperStyle,
      inputStyle,
      placeholder = '',
      leftIconContainerStyle,
      leftIcon,
      rightIconContainerStyle,
      rightIcon,
      error = '',
      errorStyle,
      rightIconAccessibilityLabel = '',
      rightIconAccessibilityHint = '',
      onIconPress,
      ...textInputProps
    }: InputProps,
    ref,
  ) => {
    const theme = useColorScheme() ?? ThemeScheme.Light;
    const inputBaseStyles = createInputStyles(theme);

    return (
      <View style={[inputBaseStyles.container, containerStyle]}>
        {/* Label */}
        {label && (
          <Text style={[inputBaseStyles.label, labelStyle]} id="form-label">
            {label}
          </Text>
        )}

        {/* Input & Icon */}
        <View
          style={[
            inputBaseStyles.inputWrapper,
            inputWrapperStyle,
            error ? inputBaseStyles.inputWrapperError : null,
          ]}>
          {leftIcon && (
            <View
              testID="input-left-icon"
              style={[
                inputBaseStyles.leftIconContainer,
                leftIconContainerStyle,
              ]}>
              {leftIcon}
            </View>
          )}
          <TextInput
            style={[inputBaseStyles.input, inputStyle]}
            accessibilityLabel={label ? `Enter your ${label}` : placeholder}
            ref={ref}
            {...textInputProps}
          />
          {rightIcon &&
            (onIconPress ? (
              <TouchableOpacity
                testID="input-right-icon"
                onPress={onIconPress}
                style={[
                  inputBaseStyles.rightIconContainer,
                  rightIconContainerStyle,
                ]}
                accessibilityRole="button"
                accessibilityLabel={rightIconAccessibilityLabel}
                accessibilityHint={rightIconAccessibilityHint}>
                {rightIcon}
              </TouchableOpacity>
            ) : (
              <View
                testID="input-right-icon"
                style={[
                  inputBaseStyles.rightIconContainer,
                  rightIconContainerStyle,
                ]}>
                {rightIcon}
              </View>
            ))}
        </View>

        {/* Error Message */}
        {error && (
          <Text style={[inputBaseStyles.error, errorStyle]}>{error}</Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
