import {
  AmountInput,
  AppHeader,
  Button,
  SendTo,
  VirtualCard,
} from '@/components';
import { ThemeScheme } from '@/constants';
import { colors } from '@/themes';
import { TRecipient, TThemeScheme } from '@/types';
import { useCallback, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('');

  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  // TODO:
  const handleSendMoney = useCallback(() => {
    console.log('handleSendMoney');
  }, []);

  console.log('amount------', amount);

  // TODO: Update later
  const handleChangeCurrency = useCallback(() => {}, []);

  // mock
  const MOCK_RECIPIENTS: TRecipient[] = [
    {
      id: 'r1',
      accountId: 'acc_101',
      nickName: 'Yamilet',
      recipientUser: {
        id: 'u101',
        email: 'yamilet@example.com',
        password: 'hashed_password',
        fullName: 'Soriano',
        phoneNumber: '0901000001',
        avatar: 'https://i.pravatar.cc/150?img=1',
        birthDate: new Date('1997-04-10'),
      },
    },
    {
      id: 'r2',
      accountId: 'acc_102',
      nickName: 'Alexa',
      recipientUser: {
        id: 'u102',
        email: 'alexa@example.com',
        password: 'hashed_password',
        fullName: 'Alexa Williams',
        phoneNumber: '0901000002',
        avatar: 'https://i.pravatar.cc/150?img=2',
        birthDate: new Date('1995-08-12'),
      },
    },
    {
      id: 'r3',
      accountId: 'acc_103',
      nickName: 'Yakub',
      recipientUser: {
        id: 'u103',
        email: 'yakub@example.com',
        password: 'hashed_password',
        fullName: 'Yakub Harris',
        phoneNumber: '0901000003',
        avatar: 'https://i.pravatar.cc/150?img=3',
        birthDate: new Date('1993-12-02'),
      },
    },
    {
      id: 'r4',
      accountId: 'acc_104',
      nickName: 'Krishna',
      recipientUser: {
        id: 'u104',
        email: 'krishna@example.com',
        password: 'hashed_password',
        fullName: 'Krishna Patel',
        phoneNumber: '0901000004',
        avatar: 'https://i.pravatar.cc/150?img=4',
        birthDate: new Date('1990-03-15'),
      },
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Send Money" />
        <View style={styles.content}>
          <View>
            <VirtualCard
              cardNumber={'4562112245957852'}
              holderName={'Ngoc Ngo Thi'}
              expiry={'24/2000'}
              cvv={'6986'}
              brandLogo={
                'https://firebasestorage.googleapis.com/v0/b/ecommerce-fashion-16e2e.appspot.com/o/bankpick%2Fmastercard-logo.svg?alt=media&token=77966e12-2b8f-43d0-98cf-4b787efe7d64'
              }
              brandName={'Mastercard'}
            />
            <SendTo
              recipients={MOCK_RECIPIENTS}
              selectedId={'r1'}
              containerStyles={{ marginTop: 31 }}
              onSelect={function (id: string): void {
                console.log('onSelect', id);
              }}
              onAdd={function (): void {
                console.log('onAdd');
              }}
            />
            <AmountInput
              containerStyles={{ marginTop: 31 }}
              onChange={setAmount}
              onChangeCurrency={handleChangeCurrency}
            />
          </View>
          <Button
            title="Send Money"
            disabled={false}
            onPress={handleSendMoney}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBg,
    },
    safeArea: {
      flex: 1,
      paddingTop: 16,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 32,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });
};
