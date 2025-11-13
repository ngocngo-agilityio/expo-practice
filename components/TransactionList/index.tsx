import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { View } from 'react-native';

// Components
import { LoadingIndicator, Text, TransactionItem } from '@/components';

// Types
import { TTransactionItem } from '@/types';

// Styles
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
    const { avatar = '', title = '', category = '', amount = 0 } = item || {};

    return (
      <TransactionItem
        avatar={avatar}
        title={title}
        category={category}
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
