import { Stack } from 'expo-router';

const isStorybook = process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook';

export default function RootLayout() {
  if (isStorybook && __DEV__) {
    const StorybookUI = require('../.rnstorybook').default;
    return <StorybookUI />;
  }

  return <Stack></Stack>;
}
