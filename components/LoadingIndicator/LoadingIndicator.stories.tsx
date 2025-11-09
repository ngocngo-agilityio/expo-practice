import { Meta, StoryObj } from '@storybook/react-native';

// Components
import LoadingIndicator from '.';

const meta = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
