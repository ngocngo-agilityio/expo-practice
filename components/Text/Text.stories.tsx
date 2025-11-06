import type { Meta, StoryObj } from '@storybook/react-native';

// Components
import Text from '.';

const meta = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    children: { control: 'text' },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl'],
    },
    color: { control: 'color' },
    fontFamily: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Hello world!',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Text size="2xs">2xs</Text>
      <Text size="xs">xs</Text>
      <Text size="sm">sm</Text>
      <Text size="base">base</Text>
      <Text size="md">md</Text>
      <Text size="lg">lg</Text>
      <Text size="xl">xl</Text>
      <Text size="2xl">2xl</Text>
    </>
  ),
};

export const CustomColor: Story = {
  args: {
    children: 'Custom color text',
    color: 'tomato',
  },
};
