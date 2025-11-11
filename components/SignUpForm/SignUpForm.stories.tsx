import { Meta, StoryObj } from '@storybook/react-native';

// Components
import SignUpForm from '.';

const meta = {
  title: 'Components/SignUpForm',
  component: SignUpForm,
  argTypes: {
    isSubmitting: { control: 'boolean' },
    errorAPI: { control: 'text' },
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onSubmit: () => {},
    onNavigateSignIn: () => {},
    isSubmitting: false,
  },
};

export const Loading: Story = {
  args: {
    onSubmit: () => {},
    onNavigateSignIn: () => {},
    isSubmitting: true,
  },
};
