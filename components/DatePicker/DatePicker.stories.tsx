import { Meta, StoryObj } from '@storybook/react-native';

// Components
import DatePicker from '.';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    defaultValue: {
      control: 'date',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Birth Date',
    defaultValue: new Date(2000, 8, 28),
  },
};

export const WithError: Story = {
  args: {
    label: 'Birth Date',
    defaultValue: new Date(1999, 4, 12),
    error: 'Please select valid date',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Event Date',
    defaultValue: new Date(),
  },
};
