// Libs
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';

// Components
import { Button, Input, Text } from '@/components';

// Icons
import { HiddenIcon, LockIcon, MailIcon, ShowIcon } from '@/components/icons';

// Constants
import { LOGIN_VALIDATION_RULES } from '@/constants';

// Types
import { TSignInFormData } from '@/types';

// Utils

// Styles
import { isEnableSubmitButton } from '@/utils';
import { styles } from './styles';

export type TLoginFormProps = {
  onSubmit: (data: TSignInFormData) => void;
  onNavigateSignUp: () => void;
  isSubmitting?: boolean;
  clearErrorAPI?: () => void;
  errorAPI?: string;
};

const REQUIRE_FIELDS = ['email', 'password'];
const DEFAULT_VALUES = { email: '', password: '' };

const LoginForm = ({
  onSubmit,
  onNavigateSignUp,
  isSubmitting = false,
  clearErrorAPI,
  errorAPI = '',
}: TLoginFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TSignInFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const values = useWatch({ control });
  const dirtyItems = (Object.keys(values) as (keyof TSignInFormData)[]).filter(
    key => values[key] !== DEFAULT_VALUES[key],
  );

  const shouldEnable = isEnableSubmitButton(REQUIRE_FIELDS, dirtyItems, errors);
  const isDisableSubmit = !shouldEnable || !!errorAPI || isSubmitting;

  const passwordInputRef = useRef<TextInput>(null);

  const handleTogglePassword = useCallback(() => {
    setIsShowPassword(prev => !prev);
  }, []);

  const handleOnChange = (fieldName: keyof TSignInFormData) => {
    clearErrors(fieldName);
    clearErrorAPI && clearErrorAPI();
  };

  return (
    <View style={styles.container}>
      <Controller
        name="email"
        control={control}
        rules={LOGIN_VALIDATION_RULES(watch).email}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            label="Email Address"
            leftIcon={<MailIcon />}
            onChangeText={(value: string) => {
              handleOnChange('email');
              onChange(value);
            }}
            error={error?.message}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={LOGIN_VALIDATION_RULES(watch).password}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            ref={passwordInputRef}
            label="Password"
            onChangeText={(value: string) => {
              handleOnChange('password');
              onChange(value);
            }}
            secureTextEntry={!isShowPassword}
            textContentType="password"
            leftIcon={<LockIcon />}
            rightIcon={isShowPassword ? <HiddenIcon /> : <ShowIcon />}
            onIconPress={handleTogglePassword}
            error={error?.message}
            returnKeyType="done"
            rightIconAccessibilityLabel="Toggle password visibility"
            rightIconAccessibilityHint={
              isShowPassword ? 'Hide password' : 'Show password'
            }
          />
        )}
      />

      <Button
        style={styles.signUpBtn}
        title="Sign In"
        isLoading={isSubmitting}
        disabled={isDisableSubmit}
        onPress={handleSubmit(onSubmit)}
        accessibilityHint="Navigate to the home screen after successful sign in"
      />

      <View style={styles.footerWrapper}>
        <Text size="sm" style={styles.footerText}>
          I’m a new user.{' '}
        </Text>
        <TouchableOpacity
          onPress={onNavigateSignUp}
          accessibilityRole="button"
          accessibilityHint="Navigate back to the sign up screen">
          <Text size="sm" style={styles.signIn}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
