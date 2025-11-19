import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Constants
import {
  INFINITY_TRANSACTION_LIMIT,
  QUERY_KEY,
  ThemeScheme,
} from '@/constants';

// Types
import { TThemeScheme } from '@/types';

// Components
import {
  AppHeader,
  SearchInput,
  TransactionList,
  TransactionListSkeleton,
} from '@/components';
import { ClockIcon } from '@/components/icons';

// Themes
import { BASE_COLORS, colors } from '@/themes';

// Stores
import { useAccountStore } from '@/stores';

// Apis
import { useGetTransactionsInfinite } from '@/apis';

export default function TransactionHistoryScreen() {
  const [searchValue, setSearchValue] = useState('');

  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  // Stores
  const accountId = useAccountStore(state => state.accountId);

  // Apis
  const {
    data: transactions,
    isLoading,
    error: transactionError,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useGetTransactionsInfinite(accountId || '', searchValue);

  const queryClient = useQueryClient();

  const handleOnRefresh = async () => {
    await queryClient.removeQueries({
      queryKey: QUERY_KEY.TRANSACTIONS_BY_ACCOUNT_INFINITY(
        accountId ?? '',
        searchValue,
        INFINITY_TRANSACTION_LIMIT,
      ),
    });
    refetch();
  };

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (transactionError) {
      Toast.show({
        type: 'error',
        text1: transactionError,
      });
    }
  }, [transactionError]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top']}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <AppHeader
              title="Transaction History"
              rightIcon={
                <ClockIcon
                  color={
                    theme === ThemeScheme.Light
                      ? BASE_COLORS.darkGunmetal
                      : BASE_COLORS.white
                  }
                />
              }
            />

            <View style={styles.content}>
              <View style={styles.searchContainer}>
                <SearchInput onSearchChange={handleOnSearch} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.listContainer}>
          {isLoading ? (
            <TransactionListSkeleton count={10} />
          ) : (
            <TransactionList
              data={transactions}
              isFetchingNextPage={isFetchingNextPage}
              onLoadMore={fetchNextPage}
              isRefetching={isRefetching}
              onRefresh={handleOnRefresh}
            />
          )}
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
      paddingHorizontal: 20,
      marginTop: 32,
    },
    searchContainer: {
      marginBottom: 30,
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
  });
};
