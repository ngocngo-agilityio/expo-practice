import { Button, Text } from '@/components';
import { useAuthStore } from '@/stores';
import { View } from 'react-native';

export default function Settings() {
  const clearAuth = useAuthStore(state => state.clearAuth);

  return (
    <View>
      <Text>Settings screen</Text>;
      <Button title="Logout" onPress={clearAuth} />
    </View>
  );
}
