import { Meta, StoryObj } from '@storybook/react-native';

// Component
import VirtualCard from '.';

// Mock brand logos
const mastercardLogo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/320px-Mastercard-logo.png';

const meta = {
  title: 'Components/VirtualCard',
  component: VirtualCard,
  argTypes: {
    cardNumber: { control: 'text' },
    holderName: { control: 'text' },
    expiry: { control: 'text' },
    cvv: { control: 'text' },
    brandLogo: { control: 'text' },
    brandName: { control: 'text' },
  },
} satisfies Meta<typeof VirtualCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mastercard: Story = {
  args: {
    cardNumber: '4562112245957852',
    holderName: 'AR Jonson',
    expiry: '24/2000',
    cvv: '6986',
    brandLogo: mastercardLogo,
    brandName: 'Mastercard',
  },
};
