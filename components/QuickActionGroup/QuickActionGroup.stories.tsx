import { Meta, StoryObj } from '@storybook/react-native';

// Components
import QuickActionGroup from '.';

const meta = {
  title: 'Components/QuickActionGroup',
  component: QuickActionGroup,
} satisfies Meta<typeof QuickActionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
