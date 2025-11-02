// components/input.stories.tsx
import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Input } from './input';

const meta = {
  title: 'Example/Input',
  component: Input,
  decorators: [
    // You can wrap your stories here with anything you like
    Story => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'First Name',
    placeholder: 'John',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    error: 'Email is required',
    disabled: false,
    placeholder: 'example@example.com',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    error: '',
    disabled: true,
    placeholder: 'Disabled',
  },
};
