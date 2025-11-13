import { Meta } from '@storybook/react-native';

// Component
import ActionItem from '.';

// Icons

const meta: Meta<typeof ActionItem> = {
  title: 'Components/ActionItem',
  component: ActionItem,
  argTypes: {
    label: { control: 'text' },
    onPress: { action: 'pressed' },
  },
};

export default meta;

// type Story = StoryObj<typeof meta>;

// export const Basic: Story = {
//   args: {
//     label: 'Sent',
//     icon: <ArrowUp />,
//   },
// };
