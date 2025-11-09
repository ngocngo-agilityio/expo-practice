// Libs
import { ActivityIndicator, View } from 'react-native';

// Themes
import { colors } from '@/themes';

// Styles
import { styles } from './styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.container} testID="loading-indicator">
      <ActivityIndicator size="large" color={colors.activityIndicator} />
    </View>
  );
};

export default LoadingIndicator;
