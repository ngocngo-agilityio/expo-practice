import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Constants
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ThemeScheme,
  TRANSACTION_TYPES,
} from '@/constants';

// Types
import { TThemeScheme } from '@/types';

// Components
import {
  AmountInput,
  AppHeader,
  Button,
  KeyboardAwareScrollView,
  SendTo,
  VirtualCard,
  VirtualCardSkeleton,
} from '@/components';
import AddRecipientModal, {
  TAddRecipientFormData,
} from '@/components/AddRecipientModal';

// Apis
import {
  useCreateRecipient,
  useGetCardsByUserId,
  useGetRecipients,
  useGetUserFromCard,
  useSendMoney,
} from '@/apis';

// Stores
import { useAccountStore, useAuthStore } from '@/stores';

// Hooks
import { useErrorAPI } from '@/hooks';

// Themes
import { colors } from '@/themes';

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [recipientCardNumber, setRecipientCardNumber] = useState('');

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
    isFetching: isFetchingFromUser,
    error: userError,
  } = useGetUserFromCard(recipientCardNumber);
  const { mutate: createRecipient } = useCreateRecipient();
  const {
    data: recipientsRaw,
    isLoading: isLoadingRecipients,
    error: recipientsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetRecipients(accountId);
  const { mutate: sendMoney, isPending: isPendingSendMoney } = useSendMoney();

  const { account, user: recipientInfo } = userFromCard || {};
  const { fullName: recipientFullName = '' } = recipientInfo || {};
  const { id: recipientAccountId = '' } = account || {};
  const card = cardsByUserId?.[0]?.cards?.[0];
  const {
    cardNumber = '',
    cardHolderName = '',
    expiredDate = '',
    cardCvv = '',
    cardType = '',
    cardLogo = '',
  } = card || {};

  const isEnabledSubmitBtn = +amount > 0 && !!selectedId;

  const recipients = useMemo(() => {
    return recipientsRaw
      .filter(
        (item, index, arr) =>
          arr.findIndex(
            r => r.recipientAccountId === item.recipientAccountId,
          ) === index,
      )
      .reverse();
  }, [recipientsRaw]);

  const cardNumberError =
    recipientInfo === null ? ERROR_MESSAGES.NOT_FOUND_CARD_NUMBER : '';

  const { errorAPI, clearErrorAPI } = useErrorAPI(cardNumberError ?? '');

  const handleValidateCardNumber = useCallback((cardNumber: string) => {
    setRecipientCardNumber(cardNumber);
  }, []);

  const handlePressPlusIcon = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    clearErrorAPI();
    setIsModalVisible(false);
  }, [clearErrorAPI]);

  const handleSelectRecipient = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleAddRecipientSuccess = useCallback(() => {
    handleCloseModal();

    Toast.show({
      type: 'success',
      text1: 'Add a new recipient successfully.',
    });
  }, [handleCloseModal]);

  const handleError = useCallback((error: string) => {
    Toast.show({
      type: 'error',
      text1: error,
    });
  }, []);

  const handleAddRecipient = useCallback(
    (data: TAddRecipientFormData) => {
      setIsModalVisible(false);

      const payload = {
        recipientAccountId,
        accountId,
        nickname: data.nickName,
      };
      createRecipient(payload, {
        onSuccess: handleAddRecipientSuccess,
        onError: handleError,
      });
    },
    [
      accountId,
      createRecipient,
      handleAddRecipientSuccess,
      handleError,
      recipientAccountId,
    ],
  );

  const handleSendMoneySuccess = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: SUCCESS_MESSAGES.SEND_MONEY,
    });
  }, []);

  const handleSendMoney = useCallback(() => {
    const payload = {
      fromAccountId: accountId,
      toAccountId: selectedId,
      amount: +amount,
      transactionType: TRANSACTION_TYPES.TRANSFER,
    };

    sendMoney(payload, {
      onSuccess: handleSendMoneySuccess,
      onError: handleError,
    });
  }, [
    accountId,
    amount,
    handleError,
    handleSendMoneySuccess,
    selectedId,
    sendMoney,
  ]);

  // TODO: Implement later
  const handleChangeCurrency = useCallback(() => {}, []);

  useEffect(() => {
    if (cardError || recipientsError || userError) {
      Toast.show({
        type: 'error',
        text1: `${cardError} ${recipientsError} ${userError}`,
      });
    }
  }, [cardError, recipientsError, userError]);

  return (
    <View style={styles.container}>
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
              disabled={!isEnabledSubmitBtn || isPendingSendMoney}
              onPress={handleSendMoney}
            />

            <AddRecipientModal
              visible={isModalVisible}
              isVerifyLoading={isFetchingFromUser}
              validatedUserFullName={recipientFullName}
              onClose={handleCloseModal}
              onSubmit={handleAddRecipient}
              onValidateCardNumber={handleValidateCardNumber}
              cardNumberError={errorAPI}
              clearErrorAPI={clearErrorAPI}
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
