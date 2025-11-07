import { Meta, StoryObj } from '@storybook/react-native';

// Components
import SearchInput from '.';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: 'Search here...',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onSearchChange: () => {},
  },
};
