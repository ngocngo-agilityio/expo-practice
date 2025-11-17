import { Meta, StoryObj } from '@storybook/react-native';

// Component
import AvatarPicker from '.';

const meta = {
  title: 'Components/AvatarPicker',
  component: AvatarPicker,
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Avatar size (width = height)',
    },
    initialUri: {
      control: { type: 'text' },
      description: 'Initial avatar image URL',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof AvatarPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: 90,
    initialUri: 'https://i.pravatar.cc/300?img=12',
  },
};

export const Empty: Story = {
  args: {
    size: 90,
    initialUri: '',
  },
};
