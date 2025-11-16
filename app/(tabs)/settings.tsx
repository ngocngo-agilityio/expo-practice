import { Button, Input } from '@/components';
import BirthDateSelector from '@/components/DatePicker';
import { ThemeScheme } from '@/constants';
import { useAuthStore } from '@/stores';
import { colors } from '@/themes';
import { useColorScheme, View } from 'react-native';

export default function Settings() {
  const clearAuth = useAuthStore(state => state.clearAuth);
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const theme = colors[scheme];

  return (
    <View style={{ padding: 10, backgroundColor: theme.appBg, flex: 1 }}>
      <Button title="Logout" onPress={clearAuth} />
      <BirthDateSelector
        defaultValue={new Date(2000, 8, 28)}
        onChange={(date: Date) => {
          console.log('Date', date);
        }}
        error="Birth Date is required."
      />

      <Input label="Full Name" error="Full Name is valid" />

      <Input label="Full Name" error="Full Name is valid" />
    </View>
  );
}
