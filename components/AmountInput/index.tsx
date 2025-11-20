import React, { forwardRef, memo, useCallback, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Constants
import { ThemeScheme } from '@/constants';

// Themes
import { createAmountInputStyles } from './styles';

type TAmountInputProps = {
  defaultValue?: string;
  currency?: string;
  onChange: (value: string) => void;
  onChangeCurrency: () => void;
};

const AmountInput = forwardRef<TextInput, TAmountInputProps>(
  (
    { defaultValue = '', currency = 'USD', onChange, onChangeCurrency },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const scheme = useColorScheme() ?? ThemeScheme.Light;
    const styles = createAmountInputStyles(scheme);

    const handleOnChange = useCallback(
      (amount: string) => {
        setInternalValue(amount);
        onChange?.(amount);
      },
      [onChange],
    );

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.label}>Enter Your Amount</Text>

          <TouchableOpacity onPress={onChangeCurrency}>
            <Text style={styles.changeCurrency}>Change Currency?</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Row */}
        <View style={styles.amountRow}>
          <Text size="lg" style={styles.currency}>
            {currency}
          </Text>

          <TextInput
            ref={ref}
            style={styles.input}
            value={internalValue}
            onChangeText={handleOnChange}
            keyboardType="numeric"
            placeholder="0.00"
          />
        </View>
      </View>
    );
  },
);

AmountInput.displayName = 'AmountInput';

export default memo(AmountInput);
