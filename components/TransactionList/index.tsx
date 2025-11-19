import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { View } from 'react-native';

// Components
import { LoadingIndicator, Text, TransactionItem } from '@/components';

// Types
import { TTransactionItem } from '@/types';

// Constants
import { USER_DEFAULT_AVATAR } from '@/constants';

// Styles
import { styles } from './styles';

type TTransactionListProps = {
  data: TTransactionItem[];
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  isRefetching?: boolean;
  onRefresh?: () => void;
};

const TransactionList = ({
  data,
  isFetchingNextPage = false,
  onLoadMore,
  isRefetching = false,
  onRefresh,
}: TTransactionListProps) => {
  const getKeyExtractor = (item: TTransactionItem) => {
    const { id } = item || {};

    return id;
  };

  const renderItem = ({ item }: ListRenderItemInfo<TTransactionItem>) => {
    const { transactionType = '', amount = 0, relatedUser } = item || {};
    const { avatar = USER_DEFAULT_AVATAR, fullName } = relatedUser || {};

    return (
      <TransactionItem
        avatar={avatar || USER_DEFAULT_AVATAR}
        title={fullName}
        category={transactionType}
        amount={amount}
      />
    );
  };

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={getKeyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      refreshing={isRefetching}
      onRefresh={onRefresh}
      ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Text style={styles.noItems}>No transactions in list</Text>
      }
      ListFooterComponentStyle={{ marginVertical: 22 }}
      ItemSeparatorComponent={renderItemSeparator}
    />
  );
};

export default TransactionList;
