import { Redirect, Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import {
  HomeIcon,
  PieChartIcon,
  SettingsIcon,
  WalletIcon,
} from '@/components/icons';

// Themes
import { BASE_COLORS } from '@/themes';

// Constants
import { ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const TAB_ITEMS = [
  { name: 'index', title: 'Home', Icon: HomeIcon },
  { name: 'cards', title: 'Cards', Icon: WalletIcon },
  { name: 'statistics', title: 'Statistics', Icon: PieChartIcon },
  { name: 'settings', title: 'Settings', Icon: SettingsIcon },
];

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme();

  const inactiveColor = BASE_COLORS.sleet;
  const activeColor = BASE_COLORS.blueRibbon;

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.LOGIN} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 16 : 32,
          height:
            Platform.OS === 'ios' ? 56 + insets.bottom : 64 + insets.bottom,
          backgroundColor:
            theme === 'dark'
              ? BASE_COLORS.spinelStoneBlack
              : BASE_COLORS.lighthouse,
          borderTopWidth: 0,
        },
      }}>
      {TAB_ITEMS.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <Icon color={focused ? activeColor : inactiveColor} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
