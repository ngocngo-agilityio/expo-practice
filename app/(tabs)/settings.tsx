import { AmountInput, Button } from '@/components';
import { ROUTES, ThemeScheme } from '@/constants';
import { useAuthStore } from '@/stores';
import { colors } from '@/themes';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const clearAuth = useAuthStore(state => state.clearAuth);
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const theme = colors[scheme];
  const router = useRouter();

  const amountRef = useRef<TextInput>(null);

  return (
    <View style={{ padding: 20, backgroundColor: theme.appBg, flex: 1 }}>
      <SafeAreaView>
        {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
        <Button title="Logout" onPress={clearAuth} />

        <Button
          title="Navigate to Edit Profile"
          onPress={() => router.push(ROUTES.EDIT_PROFILE)}
        />

        <View style={{ paddingVertical: 20 }}>
          <AmountInput
            ref={amountRef}
            onChange={function (value: string): void {
              console.log('onChange', value);
            }}
            onChangeCurrency={function (): void {
              console.log('onChangeCurrency');
            }}
          />
        </View>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    </View>
  );
}
