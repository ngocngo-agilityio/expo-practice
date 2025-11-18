import { View } from 'react-native';

// Components
import TransactionItemSkeleton from '@/components/TransactionItem/TransactionItemSkeleton';

// Styles
import { styles } from './styles';

const TransactionListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index}>
          <TransactionItemSkeleton />
          {index < count - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

export default TransactionListSkeleton;
