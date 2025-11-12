import { Button } from '@/components';
import { SECURE_KEYS } from '@/constants';
import { useAuthStore } from '@/stores';
import { deleteItemAsync } from 'expo-secure-store';
import { Text, View } from 'react-native';

export default function HomePage() {
  const clearAuth = useAuthStore(state => state.clearAuth);

  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Logout"
        onPress={() => {
          clearAuth();
          deleteItemAsync(SECURE_KEYS.ACCESS_TOKEN);
        }}
      />
    </View>
  );
}
