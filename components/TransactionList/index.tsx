import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { View } from 'react-native';

// Components
import { LoadingIndicator, Text, TransactionItem } from '@/components';

// Types
import { TTransactionItem } from '@/types';

// Styles
import { USER_DEFAULT_AVATAR } from '@/constants';
import { styles } from './styles';

type TTransactionListProps = {
  data: TTransactionItem[];
  isLoading?: boolean;
  onLoadMore?: () => void;
};

const TransactionList = ({
  data,
  isLoading = false,
  onLoadMore,
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
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
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
