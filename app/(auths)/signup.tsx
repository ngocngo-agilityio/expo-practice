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
import { TAuthResponse, TSignUpFormData, TThemeScheme } from '@/types';

// Constants
import { ROUTES, SUCCESS_MESSAGES, ThemeScheme } from '@/constants';

// Themes
import { colors, fontFamilies } from '@/themes';

// Apis
import { useAuthSignUp } from '@/apis';

// Hooks
import { useErrorAPI } from '@/hooks';

export default function SignUpPage() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();

  // Apis
  const { error: errorSignUp, mutate: signup, isPending } = useAuthSignUp();

  const { errorAPI, clearErrorAPI } = useErrorAPI(errorSignUp || '');

  const handleNavigateLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleSignUpFailed = (error: string): void => {
    Toast.show({ type: 'error', text1: error });
  };

  // TODO: Update later - Call api create card
  const handleSignUpSuccess = (data: TAuthResponse) => {
    Toast.show({
      type: 'success',
      text1: SUCCESS_MESSAGES.SIGN_UP,
    });
  };

  const handleSubmit = (data: TSignUpFormData) => {
    signup(
      { ...data },
      {
        onSuccess: data => handleSignUpSuccess,
        onError: handleSignUpFailed,
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
              isSubmitting={isPending}
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
