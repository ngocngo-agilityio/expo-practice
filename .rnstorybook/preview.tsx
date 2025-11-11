import type { Preview } from '@storybook/react-native';
import { ScrollView, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Constants
import { ThemeScheme } from '../constants';

const DynamicBackgroundDecorator = (Story: any) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;

  const backgroundColor = scheme === ThemeScheme.Dark ? '#161622' : 'white';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, padding: 16, backgroundColor }}>
          <Story />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const preview: Preview = {
  decorators: [DynamicBackgroundDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
