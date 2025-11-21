import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
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
  onClose: () => void;
  onValidateCardNumber: (cardNumber: string) => void;
  onSubmit: (data: TAddRecipientFormData) => void;
};

const AddRecipientModal = ({
  visible,
  validatedUserFullName,
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
  } = useForm<TAddRecipientFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      cardNumber: '',
      fullName: '',
      nickName: '',
    },
  });

  const watchedCardNumber = watch('cardNumber');

  const nickNameInputRef = useRef<TextInput>(null);

  const handleCardNumberBlur = useCallback(() => {
    const currentCardNumber = watchedCardNumber?.trim();

    // Only validate if card number is 16 digits
    if (currentCardNumber && currentCardNumber.length === 16) {
      console.log('currentCardNumber------', currentCardNumber);
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
      handleClose();
    },
    [onSubmit, handleClose],
  );

  const preventClose = useCallback((e: GestureResponderEvent) => {
    e.stopPropagation();
  }, []);

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
                    label="Card Number"
                    onChangeText={onChange}
                    onBlur={() => {
                      onBlur();
                      handleCardNumberBlur();
                    }}
                    error={error?.message}
                    keyboardType="numeric"
                    maxLength={16}
                    returnKeyType="next"
                    editable={!isSubmitting}
                    // onSubmitEditing={() => nickNameInputRef.current?.focus()}
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
                    editable={!isSubmitting}
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
                // disabled={
                //   !dirtyFields.cardNumber ||
                //   !dirtyFields.fullName ||
                //   !dirtyFields.nickName ||
                //   Object.keys(errors).length > 0
                // }
                disabled={isSubmitting}
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
