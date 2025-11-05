import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

// Components
import Button from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    // You can wrap your stories here with anything you like
    Story => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Button',
    isLoading: true,
  },
};
