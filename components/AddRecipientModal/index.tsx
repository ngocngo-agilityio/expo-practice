import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Modal,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// Constants
import { ADD_RECIPIENT_RULES, ThemeScheme } from '@/constants';

// Components
import { Button, Input, KeyboardAwareScrollView, Text } from '@/components';
import { CloseIcon } from '@/components/icons';

// Themes
import { colors } from '@/themes';

// Utils
import { isEnableSubmitButton } from '@/utils';

// Styles
import { createAddRecipientModalStyles } from './styles';

export type TAddRecipientFormData = {
  cardNumber: string;
  fullName: string;
  nickName: string;
};

type TAddRecipientModalProps = {
  visible: boolean;
  validatedUserFullName?: string;
  isVerifyLoading?: boolean;
  cardNumberError?: string;
  clearErrorAPI: () => void;
  onClose: () => void;
  onValidateCardNumber: (cardNumber: string) => void;
  onSubmit: (data: TAddRecipientFormData) => void;
};

const REQUIRE_FIELDS = ['cardNumber', 'fullName'];
const DEFAULT_VALUES = { cardNumber: '', fullName: '', nickName: '' };

const AddRecipientModal = ({
  visible,
  validatedUserFullName,
  isVerifyLoading = false,
  cardNumberError = '',
  clearErrorAPI,
  onClose,
  onValidateCardNumber,
  onSubmit,
}: TAddRecipientModalProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createAddRecipientModalStyles(scheme);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<TAddRecipientFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const watchedCardNumber = watch('cardNumber');
  const values = useWatch({ control });
  const dirtyItems = (
    Object.keys(values) as (keyof TAddRecipientFormData)[]
  ).filter(key => values[key] !== DEFAULT_VALUES[key]);

  const shouldEnable = isEnableSubmitButton(REQUIRE_FIELDS, dirtyItems, errors);
  const isDisableSubmit =
    isSubmitting || isVerifyLoading || !!cardNumberError || !shouldEnable;

  const cardNumberInputRef = useRef<TextInput>(null);
  const nickNameInputRef = useRef<TextInput>(null);

  const handleCardNumberBlur = useCallback(() => {
    const currentCardNumber = watchedCardNumber?.trim();

    // Only validate if card number is 16 digits
    if (currentCardNumber && currentCardNumber.length === 16) {
      onValidateCardNumber(currentCardNumber);
    }
  }, [onValidateCardNumber, watchedCardNumber]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleFormSubmit = useCallback(
    (data: TAddRecipientFormData) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  const preventClose = useCallback((e: GestureResponderEvent) => {
    e.stopPropagation();
  }, []);

  const handleOnChange = (fieldName: keyof TAddRecipientFormData) => {
    clearErrors(fieldName);
    clearErrorAPI && clearErrorAPI();
  };

  useEffect(() => {
    if (validatedUserFullName) {
      setValue('fullName', validatedUserFullName, { shouldDirty: true });
    }
  }, [setValue, validatedUserFullName]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleClose}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={preventClose}
          style={styles.modalContent}>
          <KeyboardAwareScrollView>
            <View style={styles.modalHeader}>
              <Text size="md" style={styles.modalTitle}>
                Add New Recipient
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}>
                <CloseIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Controller
                control={control}
                name="cardNumber"
                rules={ADD_RECIPIENT_RULES.cardNumber}
                render={({
                  field: { onChange, onBlur, ...rest },
                  fieldState: { error },
                }) => (
                  <Input
                    {...rest}
                    ref={cardNumberInputRef}
                    label="Card Number"
                    onChangeText={(value: string) => {
                      handleOnChange('cardNumber');
                      onChange(value);
                    }}
                    onBlur={() => {
                      onBlur();
                      handleCardNumberBlur();
                    }}
                    error={error?.message || cardNumberError}
                    keyboardType="numeric"
                    maxLength={16}
                    returnKeyType="done"
                    editable={!isSubmitting || !isVerifyLoading}
                    rightIcon={
                      isVerifyLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.activityIndicator}
                        />
                      ) : null
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="fullName"
                rules={ADD_RECIPIENT_RULES.fullName}
                render={({ field: { onChange, ...rest } }) => (
                  <Input
                    {...rest}
                    label="Full Name"
                    onChangeText={onChange}
                    error={errors.fullName?.message}
                    editable={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="nickName"
                render={({ field: { onChange, ...rest } }) => (
                  <Input
                    {...rest}
                    ref={nickNameInputRef}
                    label="Nickname (optional)"
                    onChangeText={onChange}
                    error={errors.nickName?.message}
                    returnKeyType="done"
                    editable={!isSubmitting || !isVerifyLoading}
                  />
                )}
              />
            </View>

            <View style={styles.modalFooter}>
              <Button
                title="Cancel"
                onPress={handleClose}
                style={styles.cancelButton}
                titleStyle={styles.cancelButtonText}
              />

              <Button
                title="Add Recipient"
                onPress={handleSubmit(handleFormSubmit)}
                disabled={isDisableSubmit}
                isLoading={isSubmitting}
                style={styles.submitButton}
              />
            </View>
          </KeyboardAwareScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(AddRecipientModal);
