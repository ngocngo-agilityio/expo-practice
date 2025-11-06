import { Meta, StoryObj } from '@storybook/react-native';

// Components
import Input from '.';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    editable: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
  },
};

// export const WithIcons: Story = {
//   args: {
//     label: 'Password',
//     placeholder: '••••••••',
//     leftIcon: <LockIcon />,
//     rightIcon: <ShowIcon />,
//   },
// };

export const Disabled: Story = {
  args: {
    label: 'Username',
    value: 'This field is disabled',
    editable: false,
  },
};
