import { Text, useColorScheme, View } from 'react-native';

import { Button, Input } from '@/components';
import { ShowIcon } from '@/components/icons';
import { ThemeScheme } from '@/constants';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? ThemeScheme.Light;

  return (
    <View
      style={{
        backgroundColor: scheme === ThemeScheme.Light ? 'white' : '#161622',
        display: 'flex',
        flex: 1,
        padding: 10,
      }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Click Me"
        onPress={() => alert('Button Pressed!')}
        // isLoading={true}
      />

      <Input label="Password" rightIcon={<ShowIcon />} error="Email is empty" />
      <Input
        label="Password"
        rightIcon={<ShowIcon />}
        leftIcon={<ShowIcon />}
      />
    </View>
  );
}
