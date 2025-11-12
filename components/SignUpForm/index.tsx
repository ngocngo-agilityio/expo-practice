// Libs
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';

// Components
import { Button, Input, PhoneNumberInput, Text } from '@/components';

// Icons
import { HiddenIcon, LockIcon, MailIcon, ShowIcon } from '@/components/icons';

// Constants
import { COUNTRY_CODE, SIGN_UP_VALIDATION_RULES } from '@/constants';

// Types
import { TSignUpFormData } from '@/types';

// Utils
import { isEnableSubmitButton } from '@/utils';

// Styles
import { styles } from './styles';

export type TSignUpFormProps = {
  onSubmit: (data: TSignUpFormData) => void;
  onNavigateSignIn: () => void;
  isSubmitting?: boolean;
  clearErrorAPI?: () => void;
  errorAPI?: string;
};

const REQUIRE_FIELDS = [
  'fullName',
  'phoneNumber',
  'email',
  'password',
  'confirmPassword',
];

const DEFAULT_VALUES = {
  fullName: '',
  phoneNumber: COUNTRY_CODE,
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = ({
  onSubmit,
  onNavigateSignIn,
  isSubmitting = false,
  clearErrorAPI,
  errorAPI = '',
}: TSignUpFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TSignUpFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const values = useWatch({ control });
  const dirtyItems = (Object.keys(values) as (keyof TSignUpFormData)[]).filter(
    key => values[key] !== DEFAULT_VALUES[key],
  );

  const shouldEnable = isEnableSubmitButton(REQUIRE_FIELDS, dirtyItems, errors);
  const isDisableSubmit = !shouldEnable || !!errorAPI || isSubmitting;

  const phoneNumberInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleTogglePassword = useCallback(() => {
    setIsShowPassword(prev => !prev);
  }, []);

  const handleToggleConfirmPassword = useCallback(() => {
    setIsShowConfirmPassword(prev => !prev);
  }, []);

  const handleOnChange = (fieldName: keyof TSignUpFormData) => {
    clearErrors(fieldName);
    clearErrorAPI && clearErrorAPI();
  };

  return (
    <View style={styles.container}>
      <Controller
        name="fullName"
        control={control}
        rules={SIGN_UP_VALIDATION_RULES(watch).name}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            label="Full Name"
            leftIcon={<MailIcon />}
            onChangeText={(value: string) => {
              handleOnChange('fullName');
              onChange(value);
            }}
            error={error?.message}
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        rules={SIGN_UP_VALIDATION_RULES(watch).phoneNumber}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <PhoneNumberInput
            {...rest}
            ref={phoneNumberInputRef}
            onChangeText={(value: string) => {
              handleOnChange('phoneNumber');
              onChange(value);
            }}
            error={error?.message}
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={SIGN_UP_VALIDATION_RULES(watch).email}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            ref={emailInputRef}
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
        rules={SIGN_UP_VALIDATION_RULES(watch).password}
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
            textContentType="newPassword"
            leftIcon={<LockIcon />}
            rightIcon={isShowPassword ? <HiddenIcon /> : <ShowIcon />}
            onIconPress={handleTogglePassword}
            error={error?.message}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            rightIconAccessibilityLabel="Toggle password visibility"
            rightIconAccessibilityHint={
              isShowPassword ? 'Hide password' : 'Show password'
            }
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={SIGN_UP_VALIDATION_RULES(watch).confirmPassword}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            ref={confirmPasswordInputRef}
            label="Confirm Password"
            leftIcon={<LockIcon />}
            rightIcon={isShowConfirmPassword ? <HiddenIcon /> : <ShowIcon />}
            onChangeText={(value: string) => {
              handleOnChange('confirmPassword');
              onChange(value);
            }}
            secureTextEntry={!isShowConfirmPassword}
            textContentType="newPassword"
            onIconPress={handleToggleConfirmPassword}
            error={error?.message}
            returnKeyType="done"
            rightIconAccessibilityLabel="Toggle confirm password visibility"
            rightIconAccessibilityHint={
              isShowPassword ? 'Hide confirm password' : 'Show confirm password'
            }
          />
        )}
      />

      <Button
        style={styles.signUpBtn}
        title="Sign Up"
        isLoading={isSubmitting}
        disabled={isDisableSubmit}
        onPress={handleSubmit(onSubmit)}
        accessibilityHint="Navigate to the home screen after successful sign up"
      />

      <View style={styles.footerWrapper}>
        <Text size="sm" style={styles.footerText}>
          Already have an account{' '}
        </Text>
        <TouchableOpacity
          onPress={onNavigateSignIn}
          accessibilityRole="button"
          accessibilityHint="Navigate back to the sign in screen">
          <Text size="sm" style={styles.signIn}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
