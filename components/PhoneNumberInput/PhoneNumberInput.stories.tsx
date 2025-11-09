import { Meta, StoryObj } from '@storybook/react-native';

// Components
import PhoneNumberInput from '.';

const meta = {
  title: 'Components/PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {
    label: {
      control: 'text',
      description: 'The label shown above the input',
      defaultValue: 'Phone Number',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the input',
      defaultValue: 'Enter your phone number',
    },
    error: {
      control: 'text',
      description: 'Validation error message',
    },
  },
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
  },
};

export const WithError: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    error: 'Invalid phone number',
  },
};
