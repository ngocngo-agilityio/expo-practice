import { StyleSheet, useColorScheme, View } from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

// Components
import SkeletonItem from '../SkeletonItem';

// Styles
import { createSendToStyles } from './styles';

const RecipientListSkeleton = ({ count = 4 }: { count?: number }) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createSendToStyles(scheme);

  return (
    <View style={[styles.listContainer, recipientStyles.container]}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.itemWrapper}>
          <SkeletonItem
            width={48}
            height={48}
            borderRadius={24}
            style={{ marginBottom: 4 }}
          />
          <SkeletonItem height={15} width={48} />
        </View>
      ))}
    </View>
  );
};

export default RecipientListSkeleton;

const recipientStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});
