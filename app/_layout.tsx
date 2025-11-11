// Libs
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Constants
import { ROUTES } from '@/constants';

const isStorybook = process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook';

export default function RootLayout() {
  const [isAuthenticated] = useState(false);
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

  return <Slot />;
}
