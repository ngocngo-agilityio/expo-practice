import { useRouter } from 'expo-router';
import { Keyboard, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useShallow } from 'zustand/shallow';

// Components
import {
  AppHeader,
  KeyboardAwareScrollView,
  LoginForm,
  Text,
} from '@/components';

// Types
import { TAuthResponse, TSignInFormData, TThemeScheme } from '@/types';

// Constants
import { ROUTES, ThemeScheme } from '@/constants';

// Themes
import { colors, fontFamilies } from '@/themes';

// Hooks
import { useErrorAPI } from '@/hooks';

// APIs
import { useAuthLogin, useGetUserInfo } from '@/apis';

// Stores
import { useAccountStore, useAuthStore } from '@/stores';

export default function LoginPage() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();

  // Stores
  const [user, setAuthenticated] = useAuthStore(
    useShallow(state => [state.user, state.setAuthenticated]),
  );
  const setAccountId = useAccountStore(state => state.setAccountId);

  const userId = user?.id || '';

  // Apis
  const { error: errorLogin, mutate: login, isPending } = useAuthLogin();
  const { refetch: getUserInfo, isFetching: isFetchingUserInfo } =
    useGetUserInfo(userId, !!userId);

  const { errorAPI, clearErrorAPI } = useErrorAPI(errorLogin || '');

  const handleNavigateSignUp = () => {
    router.push(ROUTES.SIGNUP);
  };

  const handleLoginFailed = (error: string): void => {
    Toast.show({ type: 'error', text1: error });
  };

  const handleLoginSuccess = async (data: TAuthResponse) => {
    const res = await getUserInfo();
    const { account } = res.data?.data || {};
    const { id = '' } = account || {};
    setAccountId(id);
    setAuthenticated(true);
  };

  const handleSubmit = (data: TSignInFormData) => {
    Keyboard.dismiss();

    login(
      { ...data },
      { onSuccess: handleLoginSuccess, onError: handleLoginFailed },
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <AppHeader hasBackButton={false} />
          <View style={styles.content}>
            <Text size="xl" style={styles.title}>
              Sign In
            </Text>
            <LoginForm
              errorAPI={errorAPI}
              clearErrorAPI={clearErrorAPI}
              isSubmitting={isPending || isFetchingUserInfo}
              onSubmit={handleSubmit}
              onNavigateSignUp={handleNavigateSignUp}
            />
          </View>
        </KeyboardAwareScrollView>
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
    scrollContainer: {
      paddingTop: 16,
      paddingBottom: 40,
    },
    content: {
      paddingHorizontal: 20,
      marginTop: 53,
    },
    title: {
      fontFamily: fontFamilies.primary.medium,
      color: theme.appHeaderTitle,
      marginBottom: 38,
    },
  });
};
