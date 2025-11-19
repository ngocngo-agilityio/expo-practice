import { ComponentProps, memo } from 'react';

// Components
import { Input } from '@/components';
import { PhoneIcon } from '@/components/icons';

type TPhoneNumberInputProps = {
  value: string;
  onChangeText: (value: string) => void;
} & ComponentProps<typeof Input>;

const PhoneNumberInput = ({
  value,
  onChangeText,
  ...rest
}: TPhoneNumberInputProps) => {
  return (
    <Input
      label="Phone Number"
      inputMode="tel"
      keyboardType="phone-pad"
      value={value}
      onChangeText={onChangeText}
      leftIcon={<PhoneIcon />}
      {...rest}
    />
  );
};

export default memo(PhoneNumberInput);
