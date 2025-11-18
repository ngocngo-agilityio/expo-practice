import { useColorScheme, View } from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

// Components
import { SkeletonItem } from '@/components';

// Styles
import { createTransactionItemStyle } from './styles';

const TransactionItemSkeleton = () => {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createTransactionItemStyle(theme);

  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <SkeletonItem width={42} height={42} borderRadius={21} />

        <View style={styles.titleWrapper}>
          <SkeletonItem width={120} height={16} />
          <SkeletonItem width={80} height={12} style={{ marginTop: 6 }} />
        </View>
      </View>

      <SkeletonItem width={70} height={16} />
    </View>
  );
};

export default TransactionItemSkeleton;
