import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

// Components
import {
  HomeIcon,
  PieChartIcon,
  SettingsIcon,
  WalletIcon,
} from '@/components/icons';

// Themes
import { BASE_COLORS } from '@/themes';

const TAB_ITEMS = [
  { name: 'index', title: 'Home', Icon: HomeIcon },
  { name: 'cards', title: 'Cards', Icon: WalletIcon },
  { name: 'statistics', title: 'Statistics', Icon: PieChartIcon },
  { name: 'settings', title: 'Settings', Icon: SettingsIcon },
];

export default function TabLayout() {
  const theme = useColorScheme();
  const inactiveColor = BASE_COLORS.sleet;
  const activeColor = BASE_COLORS.blueRibbon;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 14,
          paddingBottom: 24,
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
