import React, { memo } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

// Components
import { Text } from '@/components';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { createQuickActionStyles } from './styles';

type TActionItemProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const ActionItem = ({ label, icon, onPress }: TActionItemProps) => {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createQuickActionStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default memo(ActionItem);
