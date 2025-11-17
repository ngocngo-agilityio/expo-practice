import { Meta, StoryObj } from '@storybook/react-native';

// Components
import EditProfileForm from '.';

const meta: Meta<typeof EditProfileForm> = {
  title: 'Components/EditProfileForm',
  component: EditProfileForm,

  argTypes: {
    avatar: { control: 'text' },
    fullName: { control: 'text' },
    email: { control: 'text' },
    phoneNumber: { control: 'text' },
    position: { control: 'text' },
    birthDate: { control: 'date' },
    startAt: { control: 'date' },
    isSubmitting: { control: 'boolean' },
    errorAPI: { control: 'text' },
  },

  args: {
    avatar:
      'https://sm.ign.com/t/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.600.jpg',
    birthDate: new Date('2000-09-28'),
    startAt: new Date('2021-01-28'),
    isSubmitting: false,
    errorAPI: '',
  },
};

export default meta;

type Story = StoryObj<typeof EditProfileForm>;

export const Basic: Story = {
  render: args => <EditProfileForm {...args} />,
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
  render: args => <EditProfileForm {...args} />,
};

export const WithErrorAPI: Story = {
  args: {
    errorAPI: 'Something went wrong. Please try again.',
  },
  render: args => <EditProfileForm {...args} />,
};
