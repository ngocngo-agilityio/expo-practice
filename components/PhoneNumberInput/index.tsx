import { ComponentProps, memo, useCallback, useState } from 'react';

// Components
import { Input } from '@/components';
import { PhoneIcon } from '@/components/icons';

const COUNTRY_CODE = '+84';

type TPhoneNumberInputProps = {
  value?: string;
  onChangeText?: (value: string) => void;
} & ComponentProps<typeof Input>;

const PhoneNumberInput = ({
  value,
  onChangeText,
  ...rest
}: TPhoneNumberInputProps) => {
  const [internalValue, setInternalValue] = useState(COUNTRY_CODE);

  const handleChange = useCallback(
    (text: string) => {
      // Prevent user from deleting or modifying the country code prefix
      if (!text.startsWith(COUNTRY_CODE)) {
        return;
      }

      // Extract the numeric part entered by the user after the prefix
      const inputPart = text.slice(COUNTRY_CODE.length);

      // Get the last character entered (to validate it)
      const lastChar = inputPart[inputPart.length - 1];

      // If the user deletes all digits, keep only the prefix
      if (inputPart === '') {
        setInternalValue(COUNTRY_CODE);
        onChangeText?.(COUNTRY_CODE);
        return;
      }

      // If the last character is a digit, accept the input
      if (/[0-9]/.test(lastChar)) {
        const newValue = COUNTRY_CODE + inputPart;
        setInternalValue(newValue);
        onChangeText?.(newValue);
      }
    },
    [onChangeText],
  );

  return (
    <Input
      label="Phone Number"
      inputMode="tel"
      keyboardType="phone-pad"
      value={internalValue}
      onChangeText={handleChange}
      selection={{
        start: internalValue.length,
        end: internalValue.length,
      }}
      leftIcon={<PhoneIcon />}
      {...rest}
    />
  );
};

export default memo(PhoneNumberInput);
