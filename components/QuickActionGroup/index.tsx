import { useRouter } from 'expo-router';
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
import { ROUTES, ThemeScheme } from '@/constants';

// Themes
import { BASE_COLORS } from '@/themes';

// Styles
import { styles } from './styles';

const QuickActionGroup = () => {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const router = useRouter();

  const iconColor =
    theme === ThemeScheme.Light ? BASE_COLORS.darkGunmetal : BASE_COLORS.white;

  const ACTIONS = [
    {
      id: '1',
      label: 'Sent',
      icon: <ArrowUp color={iconColor} />,
      onPress: () => {
        router.push(ROUTES.SEND_MONEY);
      },
    },
    {
      id: '2',
      label: 'Receive',
      icon: <ArrowDown color={iconColor} />,
      onPress: () => {},
    },
    {
      id: '3',
      label: 'Loan',
      icon: <CircleDollarSign color={iconColor} />,
      onPress: () => {},
    },
    {
      id: '4',
      label: 'Topup',
      icon: <CloudUpload color={iconColor} />,
      onPress: () => {},
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
