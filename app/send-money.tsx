import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Constants
import { ThemeScheme } from '@/constants';

// Types
import { TThemeScheme } from '@/types';

// Components
import {
  AmountInput,
  AppHeader,
  Button,
  KeyboardAwareScrollView,
  LoadingIndicator,
  SendTo,
  VirtualCard,
  VirtualCardSkeleton,
} from '@/components';
import AddRecipientModal, {
  TAddRecipientFormData,
} from '@/components/AddRecipientModal';

// Apis
import {
  useGetCardsByUserId,
  useGetRecipients,
  useGetUserFromCard,
} from '@/apis';

// Stores
import { useAccountStore, useAuthStore } from '@/stores';

// Themes
import { colors } from '@/themes';

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recipientCardNumber, setRecipientCardNumber] = useState('');

  console.log('recipientCardNumber__________', recipientCardNumber);

  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  // Stores
  const user = useAuthStore(state => state.user);
  const accountId = useAccountStore(state => state.accountId) ?? '';

  // Apis
  const {
    data: cardsByUserId,
    error: cardError,
    isFetching: isFetchingCard,
  } = useGetCardsByUserId(user?.id ?? '');
  const {
    data: userFromCard,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUserFromCard(recipientCardNumber);

  const { account, user: recipientInfo } = userFromCard || {};

  console.log('account', account);
  console.log('recipientInfo', recipientInfo);

  const card = cardsByUserId?.[0]?.cards?.[0];
  const {
    data: recipients,
    isLoading: isLoadingRecipients,
    error: recipientsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetRecipients(accountId);

  const {
    cardNumber = '',
    cardHolderName = '',
    expiredDate = '',
    cardCvv = '',
    cardType = '',
    cardLogo = '',
  } = card || {};

  const isEnabledSubmitBtn = +amount > 0 && !!selectedId;

  const handleValidateCardNumber = useCallback((cardNumber: string) => {
    setRecipientCardNumber(cardNumber);
  }, []);

  const handlePressPlusIcon = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSelectRecipient = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleAddRecipient = useCallback((data: TAddRecipientFormData) => {
    setIsModalVisible(false);

    // TODO:
    // Add recipient list tam thoi cho khong cal api
  }, []);

  // TODO:
  const handleSendMoney = useCallback(() => {
    console.log('handleSendMoney');
    // Call api send money
  }, []);

  console.log('amount------', +amount);

  // TODO: Update later
  const handleChangeCurrency = useCallback(() => {}, []);

  useEffect(() => {
    if (cardError || recipientsError || userError) {
      Toast.show({
        type: 'error',
        text1: `${cardError} ${recipientsError} ${userError}`,
      });
    }
  }, [cardError, recipientsError, userError]);

  console.log('isLoadingUser==================', isLoadingUser);

  return (
    <View style={styles.container}>
      {isLoadingUser ? <LoadingIndicator /> : null}
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView>
          <AppHeader title="Send Money" />
          <View style={styles.content}>
            <View>
              {isFetchingCard ? (
                <VirtualCardSkeleton />
              ) : (
                <VirtualCard
                  cardNumber={cardNumber}
                  holderName={cardHolderName}
                  expiry={expiredDate}
                  cvv={cardCvv}
                  brandLogo={cardLogo}
                  brandName={cardType}
                />
              )}

              <SendTo
                containerStyles={{ marginTop: 31 }}
                isLoading={isLoadingRecipients}
                recipients={recipients}
                isFetchingNextPage={isFetchingNextPage}
                onLoadMore={fetchNextPage}
                selectedId={selectedId}
                onSelect={handleSelectRecipient}
                onPlusIconPress={handlePressPlusIcon}
              />
              <AmountInput
                containerStyles={{ marginTop: 31 }}
                onChange={setAmount}
                onChangeCurrency={handleChangeCurrency}
              />
            </View>

            <Button
              style={styles.submitBtn}
              title="Send Money"
              disabled={!isEnabledSubmitBtn}
              onPress={handleSendMoney}
            />

            <AddRecipientModal
              visible={isModalVisible}
              onClose={handleCloseModal}
              onSubmit={handleAddRecipient}
              onValidateCardNumber={handleValidateCardNumber}
            />
          </View>
        </KeyboardAwareScrollView>
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
    wrapper: { flex: 1 },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 32,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    submitBtn: { marginTop: 48 },
  });
};
