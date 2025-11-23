import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { AppHeader, Text } from '@/components';
import {
  BellIcon,
  BillIcon,
  ChevronRightIcon,
  DocumentIcon,
  MapPinIcon,
  MessageIcon,
  ProfileIcon,
  SettingsIcon,
  UserEditIcon,
} from '@/components/icons';

// Constants
import { ROUTES, ThemeScheme, USER_DEFAULT_AVATAR } from '@/constants';

// Themes
import { BASE_COLORS, colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

// Stores
import { useAuthStore } from '@/stores';

// Apis
import { useGetUserInfo } from '@/apis';

type TProfileMenuItem = {
  key: string;
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export default function Profile() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();

  // Stores
  const user = useAuthStore(state => state.user);
  const userId = user?.id ?? '';

  // Apis
  const { data: profile } = useGetUserInfo(userId);
  const { user: userProfile } = profile || {};
  const { avatar = USER_DEFAULT_AVATAR, fullName = '' } = userProfile || {};

  const iconColor = BASE_COLORS.outlawedOrange;

  const menuItems = useMemo<TProfileMenuItem[]>(
    () => [
      {
        key: 'personal-info',
        title: 'Personal Information',
        icon: <ProfileIcon color={iconColor} />,
        onPress: () => router.push(ROUTES.EDIT_PROFILE),
      },
      {
        key: 'payment-preferences',
        title: 'Payment Preferences',
        icon: <DocumentIcon color={iconColor} />,
      },
      {
        key: 'banks-cards',
        title: 'Banks and Cards',
        icon: <BillIcon color={iconColor} />,
      },
      {
        key: 'notifications',
        title: 'Notifications',
        icon: <BellIcon color={iconColor} />,
      },
      {
        key: 'message-center',
        title: 'Message Center',
        icon: <MessageIcon color={iconColor} />,
      },
      {
        key: 'address',
        title: 'Address',
        icon: <MapPinIcon color={iconColor} />,
      },
      {
        key: 'settings',
        title: 'Settings',
        icon: <SettingsIcon color={iconColor} />,
        onPress: () => router.push('/(tabs)/settings'),
      },
    ],
    [router, iconColor],
  );

  const renderMenuItem = (item: TProfileMenuItem) => {
    const content = (
      <View style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          {item.icon}
          <Text style={styles.menuItemTitle}>{item.title}</Text>
        </View>
        <ChevronRightIcon />
      </View>
    );

    if (item.onPress) {
      return (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.7}
          onPress={item.onPress}>
          {content}
        </TouchableOpacity>
      );
    }

    return <View key={item.key}>{content}</View>;
  };

  const handleNavigateToEditProfile = useCallback(() => {
    router.push(ROUTES.EDIT_PROFILE);
  }, [router]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <AppHeader
          title="Profile"
          rightIcon={<UserEditIcon color={iconColor} />}
          onPressRight={handleNavigateToEditProfile}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: avatar || USER_DEFAULT_AVATAR,
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text size="md" style={styles.userName}>
                {fullName || 'User Name'}
              </Text>
              <Text size="xs" style={styles.userTitle}>
                Senior Designer
              </Text>
            </View>
          </View>

          <View style={styles.menuList}>
            {menuItems.map(item => renderMenuItem(item))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBg,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 32,
      paddingBottom: 40,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 40,
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: 22,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      color: theme.appHeaderTitle,
      fontFamily: fontFamilies.primary.medium,
      marginBottom: 10,
    },
    userTitle: {
      color: theme.descriptionText,
    },
    menuList: {
      gap: 0,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 18,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor:
        scheme === ThemeScheme.Dark
          ? BASE_COLORS.blackRock
          : BASE_COLORS.icewindDale,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    menuItemTitle: {
      color: theme.appHeaderTitle,
    },
  });
};
