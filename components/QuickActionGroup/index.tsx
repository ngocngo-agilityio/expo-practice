import { useColorScheme, View } from 'react-native';

// Components
import { QuickActionItem } from '@/components';
import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  CloudUpload,
} from '@/components/icons';

// Constants
import { ThemeScheme } from '@/constants';

// Themes
import { BASE_COLORS } from '@/themes';

// Styles
import { styles } from './styles';

const QuickActionGroup = () => {
  const theme = useColorScheme() ?? ThemeScheme.Light;

  const iconColor =
    theme === ThemeScheme.Light ? BASE_COLORS.darkGunmetal : BASE_COLORS.white;

  const ACTIONS = [
    {
      id: '1',
      label: 'Sent',
      icon: <ArrowUp color={iconColor} />,
      onPress: () => {
        console.log('Sent');
      },
    },
    {
      id: '2',
      label: 'Receive',
      icon: <ArrowDown color={iconColor} />,
      onPress: () => {
        console.log('Receive');
      },
    },
    {
      id: '3',
      label: 'Loan',
      icon: <CircleDollarSign color={iconColor} />,
      onPress: () => {
        console.log('Receive');
      },
    },
    {
      id: '4',
      label: 'Topup',
      icon: <CloudUpload color={iconColor} />,
      onPress: () => {
        console.log('Topup');
      },
    },
  ];

  return (
    <View style={styles.container}>
      {ACTIONS.map(item => {
        const { id, label, icon, onPress } = item;

        return (
          <QuickActionItem
            key={id}
            label={label}
            icon={icon}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default QuickActionGroup;
