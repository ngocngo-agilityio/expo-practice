import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { AppHeader, ConfirmModal, Text } from '@/components';
import { ChevronRightIcon, ExitDoorIcon } from '@/components/icons';

// Constants
import { ROUTES, ThemeScheme } from '@/constants';

// Themes
import { BASE_COLORS, colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

// Auth
import { useAuthStore } from '@/stores/useAuthStore';

type TSettingItem = {
  key: string;
  title: string;
  value?: string;
  onPress?: () => void;
};

export default function Settings() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Stores
  const clearAuth = useAuthStore(state => state.clearAuth);

  const showLogoutModal = useCallback(() => setLogoutModalVisible(true), []);
  const hideLogoutModal = useCallback(() => setLogoutModalVisible(false), []);

  const generalItems = useMemo<TSettingItem[]>(
    () => [
      { key: 'language', title: 'Language', value: 'English' },
      {
        key: 'profile',
        title: 'My Profile',
        onPress: () => router.push(ROUTES.PROFILE),
      },
      { key: 'contact', title: 'Contact Us' },
    ],
    [router],
  );

  const securityItems = useMemo<TSettingItem[]>(
    () => [
      { key: 'password', title: 'Change Password' },
      { key: 'privacy', title: 'Privacy Policy' },
    ],
    [],
  );

  const handleConfirmLogout = useCallback(() => {
    hideLogoutModal();
    clearAuth();
    router.replace(ROUTES.LOGIN);
  }, [clearAuth, hideLogoutModal, router]);

  const renderSettingItem = (item: TSettingItem) => {
    const content = (
      <View style={[styles.item]}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        <View style={styles.itemRight}>
          {!!item.value && <Text style={styles.itemValue}>{item.value}</Text>}

          <ChevronRightIcon />
        </View>
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <AppHeader
          title="Settings"
          rightIcon={
            <ExitDoorIcon
              color={
                scheme === ThemeScheme.Dark
                  ? BASE_COLORS.white
                  : BASE_COLORS.darkGunmetal
              }
            />
          }
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>General</Text>

            <View>{generalItems.map(item => renderSettingItem(item))}</View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Security</Text>

            <View>{securityItems.map(item => renderSettingItem(item))}</View>

            <Text size="xs" style={styles.helperText}>
              Choose what data you share with us
            </Text>

            <View style={[styles.item, styles.toggleItem]}>
              <Text style={styles.itemTitle}>Biometric</Text>

              <Switch
                accessibilityLabel="Toggle biometric"
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{
                  false:
                    scheme === ThemeScheme.Dark
                      ? BASE_COLORS.darkGunmetal
                      : BASE_COLORS.icewindDale,
                  true: BASE_COLORS.blueRibbon,
                }}
                thumbColor={BASE_COLORS.white}
              />
            </View>

            <TouchableOpacity
              style={[styles.item]}
              activeOpacity={0.7}
              onPress={showLogoutModal}>
              <Text style={[styles.itemTitle]}>Logout</Text>
              <ExitDoorIcon color={BASE_COLORS.seriousCloud} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ConfirmModal
          visible={logoutModalVisible}
          message="Log out of your account?"
          cancelText="Cancel"
          confirmText="Logout"
          onCancel={hideLogoutModal}
          onConfirm={handleConfirmLogout}
        />
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
      paddingTop: 16,
    },
    content: {
      paddingHorizontal: 20,
      paddingVertical: 31,
      gap: 32,
    },
    section: {
      gap: 12,
    },
    sectionLabel: {
      letterSpacing: 1,
      color: colors.settingsLabel,
    },
    item: {
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
    itemTitle: {
      color: theme.appHeaderTitle,
      fontFamily: fontFamilies.primary.medium,
    },
    itemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    itemValue: {
      color: theme.descriptionText,
    },
    helperText: {
      color: theme.settingsRightText,
      marginTop: 8,
    },
    toggleItem: {
      borderBottomWidth: 0,
    },
  });
};
