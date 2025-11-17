import { Button, KeyboardAwareScrollView } from '@/components';
import { ROUTES, ThemeScheme } from '@/constants';
import { useAuthStore } from '@/stores';
import { colors } from '@/themes';
import { useRouter } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const clearAuth = useAuthStore(state => state.clearAuth);
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const theme = colors[scheme];
  const router = useRouter();

  return (
    <View style={{ padding: 20, backgroundColor: theme.appBg, flex: 1 }}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Button title="Logout" onPress={clearAuth} />

          <Button
            title="Navigate to Edit Profile"
            onPress={() => router.push(ROUTES.EDIT_PROFILE)}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
