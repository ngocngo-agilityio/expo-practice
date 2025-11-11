import { Meta, StoryObj } from '@storybook/react-native';

// Components
import LoginForm from '.';

// Types

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  argTypes: {
    isSubmitting: { control: 'boolean' },
    errorAPI: { control: 'text' },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onSubmit: () => {},
    onNavigateSignUp: () => {},
    isSubmitting: false,
  },
};

export const Loading: Story = {
  args: {
    onSubmit: () => {},
    onNavigateSignUp: () => {},
    isSubmitting: true,
  },
};
