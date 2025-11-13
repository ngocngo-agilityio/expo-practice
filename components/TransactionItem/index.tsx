import { Image } from 'expo-image';
import React, { memo } from 'react';
import { useColorScheme, View } from 'react-native';

// Components
import { Text } from '@/components';

// Utils
import { formatCurrency } from '@/utils';

// Styles
import { ThemeScheme } from '@/constants';
import { createTransactionItemStyle } from './styles';

export type TTransactionItemProps = {
  avatar: string;
  title: string;
  category: string;
  amount: number;
};

const TransactionItem = ({
  avatar,
  title,
  category,
  amount,
}: TTransactionItemProps) => {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createTransactionItemStyle(theme);
  const formattedAmount = formatCurrency(amount);

  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <View style={styles.iconWrapper}>
          <Image source={avatar} style={styles.icon} contentFit="contain" />
        </View>

        <View style={styles.titleWrapper}>
          <Text size="base" style={styles.title}>
            {title}
          </Text>
          <Text size="xs" style={styles.subtitle}>
            {category}
          </Text>
        </View>
      </View>

      <Text size="base" style={styles.amount}>
        {formattedAmount}
      </Text>
    </View>
  );
};

export default memo(TransactionItem);
