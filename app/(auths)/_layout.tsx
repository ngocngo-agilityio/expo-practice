import { Redirect, Stack } from 'expo-router';

// Constants
import { ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href={ROUTES.HOME} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: 'Login' }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, title: 'Sign Up' }}
      />
    </Stack>
  );
}
