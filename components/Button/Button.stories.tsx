import { Meta, StoryObj } from '@storybook/react-native';

// Components
import Button from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
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
