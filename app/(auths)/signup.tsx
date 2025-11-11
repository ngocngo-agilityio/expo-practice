import { useRouter } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import {
  AppHeader,
  KeyboardAwareScrollView,
  SignUpForm,
  Text,
} from '@/components';

// Types
import { TSignInFormData, TThemeScheme } from '@/types';

// Constants
import { ROUTES, ThemeScheme } from '@/constants';

// Themes
import { colors, fontFamilies } from '@/themes';

export default function SignUpPage() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(scheme);
  const router = useRouter();

  const handleNavigateSignUp = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleSubmit = (data: TSignInFormData) => {
    console.log('handleSubmit', data);
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
              onSubmit={handleSubmit}
              onNavigateSignIn={handleNavigateSignUp}
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
