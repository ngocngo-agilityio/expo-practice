import type { Preview } from '@storybook/react-native';
import { View, useColorScheme } from 'react-native';

// Constants
import { ThemeScheme } from '../constants';

const DynamicBackgroundDecorator = (Story: any) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;

  const backgroundColor = scheme === ThemeScheme.Dark ? '#161622' : 'white';

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor }}>
      <Story />
    </View>
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
