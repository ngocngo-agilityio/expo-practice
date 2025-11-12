// Libs
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

// Constants
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/stores';

const isStorybook = process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();

  const [loaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      if (!isStorybook) {
        if (!isAuthenticated) {
          router.replace(ROUTES.LOGIN);
        } else {
          router.replace(ROUTES.HOME);
        }
      }
    }
  }, [loaded, error, isAuthenticated, router]);

  if (!loaded && !error) {
    return null;
  }

  if (isStorybook && __DEV__) {
    const StorybookUI = require('../.rnstorybook').default;
    return <StorybookUI />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <Toast />
    </QueryClientProvider>
  );
}
