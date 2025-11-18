import { useRouter } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Components
import {
  AppHeader,
  KeyboardAwareScrollView,
  SignUpForm,
  Text,
} from '@/components';

// Types
import {
  TAuthResponse,
  TCreateCardRes,
  TSignUpFormData,
  TThemeScheme,
} from '@/types';

// Constants
import { ROUTES, SUCCESS_MESSAGES, ThemeScheme } from '@/constants';

// Themes
import { colors, fontFamilies } from '@/themes';

// Apis
import { useAuthSignUp, useCreateNewCard } from '@/apis';

// Hooks
import { useErrorAPI } from '@/hooks';

// Stores
import { useAccountStore, useAuthStore } from '@/stores';

export default function SignUpPage() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();

  // Stores
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setAccountId = useAccountStore(state => state.setAccountId);

  // Apis
  const { error: errorSignUp, mutate: signup, isPending } = useAuthSignUp();
  const { mutate: createCard, isPending: isPendingCreateCard } =
    useCreateNewCard();

  const { errorAPI, clearErrorAPI } = useErrorAPI(errorSignUp || '');

  const handleNavigateLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleFailed = (error: string): void => {
    Toast.show({ type: 'error', text1: error });
  };

  const handleCreateCardSuccess = (data: TCreateCardRes) => {
    const { card } = data;
    const { accountId } = card || {};

    setAccountId(accountId);
    setAuthenticated(true);

    Toast.show({
      type: 'success',
      text1: SUCCESS_MESSAGES.SIGN_UP,
    });
  };

  const handleSignUpSuccess = (data: TAuthResponse) => {
    // Call API to create card
    const { user } = data;
    const { id: userId, fullName } = user || {};

    createCard(
      { userId, fullName },
      {
        onSuccess: handleCreateCardSuccess,
        onError: handleFailed,
      },
    );
  };

  const handleSubmit = (data: TSignUpFormData) => {
    signup(
      { ...data },
      {
        onSuccess: handleSignUpSuccess,
        onError: handleFailed,
      },
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <AppHeader />
          <View style={styles.content}>
            <Text size="xl" style={styles.title}>
              Sign Up
            </Text>
            <SignUpForm
              errorAPI={errorAPI}
              clearErrorAPI={clearErrorAPI}
              isSubmitting={isPending || isPendingCreateCard}
              onSubmit={handleSubmit}
              onNavigateSignIn={handleNavigateLogin}
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
