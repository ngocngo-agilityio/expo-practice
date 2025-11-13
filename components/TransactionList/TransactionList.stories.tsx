import { Meta, StoryObj } from '@storybook/react-native';

// Component
import TransactionList from '.';

// Mocks
import { TRANSACTIONS_MOCK } from '@/mocks';

const meta = {
  title: 'Components/TransactionList',
  component: TransactionList,
  argTypes: {
    data: { control: 'object' },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof TransactionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: TRANSACTIONS_MOCK,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const WithLoading: Story = {
  args: {
    data: TRANSACTIONS_MOCK,
    isLoading: true,
  },
};
