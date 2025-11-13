import { Meta, StoryObj } from '@storybook/react-native';

// Component
import TransactionItem from './index';

// Avatar sample
const sampleAvatar =
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg';

const meta = {
  title: 'Components/TransactionItem',
  component: TransactionItem,
  argTypes: {
    avatar: { control: 'text' },
    title: { control: 'text' },
    category: { control: 'text' },
    amount: { control: 'number' },
  },
} satisfies Meta<typeof TransactionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    avatar: sampleAvatar,
    title: 'Apple Store',
    category: 'Entertainment',
    amount: -5.99,
  },
};
