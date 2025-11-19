import dayjs from 'dayjs';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, useColorScheme, View } from 'react-native';

// Styles
import { createEditProfileStyles } from './styles';

// Constants
import { EDIT_PROFILE_VALIDATION_RULES, ThemeScheme } from '@/constants';

// Types
import { TEditProfileData } from '@/types';

// Components
import {
  AvatarPicker,
  Button,
  DatePicker,
  Input,
  PhoneNumberInput,
  Text,
} from '@/components';
import { MailIcon } from '@/components/icons';
import { TDatePickerRef } from '../DatePicker';

export type TEditProfileFormProps = {
  avatar?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: Date;
  position: string;
  startAt: Date;
  onSubmit: (data: TEditProfileData) => void;
  isSubmitting?: boolean;
  clearErrorAPI?: () => void;
  errorAPI?: string;
};

const EditProfileForm = ({
  avatar = '',
  fullName = '',
  email = '',
  phoneNumber = '',
  birthDate,
  position,
  startAt,
  onSubmit,
  isSubmitting = false,
  clearErrorAPI,
  errorAPI = '',
}: TEditProfileFormProps) => {
  const DEFAULT_VALUES = {
    avatar,
    fullName,
    email,
    phoneNumber,
    birthDate,
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isDirty },
  } = useForm<TEditProfileData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createEditProfileStyles(theme);

  const phoneNumberInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const birthDateInputRef = useRef<TDatePickerRef>(null);

  const formattedStartedAt = dayjs(startAt).format('DD MMM YYYY');

  const disabledSubmitBtn = !isDirty || !!errorAPI || isSubmitting;

  const handleOnChange = (fieldName: keyof TEditProfileData) => {
    clearErrors(fieldName);
    clearErrorAPI && clearErrorAPI();
  };

  return (
    <View style={styles.container}>
      <Controller
        name="avatar"
        control={control}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <AvatarPicker
            {...rest}
            initialUri={avatar}
            onChange={(value: string) => {
              handleOnChange('avatar');
              onChange(value);
            }}
          />
        )}
      />

      <Text style={styles.name}>{fullName}</Text>
      <Text size="xs" style={styles.position}>
        {position}
      </Text>

      <Controller
        name="fullName"
        control={control}
        rules={EDIT_PROFILE_VALIDATION_RULES.name}
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
        name="email"
        control={control}
        rules={EDIT_PROFILE_VALIDATION_RULES.email}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Input
            {...rest}
            ref={emailInputRef}
            editable={false}
            label="Email Address"
            leftIcon={<MailIcon />}
            onChangeText={(value: string) => {
              handleOnChange('email');
              onChange(value);
            }}
            error={error?.message}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        rules={EDIT_PROFILE_VALIDATION_RULES.phoneNumber}
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
            onSubmitEditing={() => birthDateInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        name="birthDate"
        control={control}
        rules={EDIT_PROFILE_VALIDATION_RULES.birthDate}
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <DatePicker
            {...rest}
            ref={birthDateInputRef}
            defaultValue={birthDate}
            label="Birth Date"
            onChange={(value: Date) => {
              handleOnChange('birthDate');
              onChange(value);
            }}
            error={error?.message}
          />
        )}
      />

      <Button
        style={styles.submitBtn}
        title="Update Profile"
        disabled={disabledSubmitBtn}
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <Text style={styles.startAt}>{`Joined ${formattedStartedAt}`}</Text>
    </View>
  );
};

export default EditProfileForm;
