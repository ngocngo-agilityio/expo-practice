import { Meta, StoryObj } from '@storybook/react-native';

// Components
import AppHeader from '.';

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  argTypes: {
    title: { control: 'text' },
    hasBackButton: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'My Cards',
  },
};

// export const WithIcons: Story = {
//   args: {
//     title: 'My Cards',
//     hasBackButton: true,
//     rightIcon: <UserEditIcon />,
//   },
// };

export const TitleOnly: Story = {
  args: {
    title: 'My Cards',
    hasBackButton: false,
  },
};
