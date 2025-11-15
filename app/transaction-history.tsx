import { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
import { ThemeScheme } from '@/constants';

// Types
import { TThemeScheme } from '@/types';

// Components
import {
  AppHeader,
  KeyboardAwareScrollView,
  SearchInput,
  TransactionList,
} from '@/components';
import { ClockIcon } from '@/components/icons';

// Mocks
import { TRANSACTIONS_MOCK } from '@/mocks';

// Themes
import { BASE_COLORS, colors } from '@/themes';

export default function TransactionHistoryScreen() {
  const [searchValue, setSearchValue] = useState('');
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  // TODO:
  const isLoading = false;
  const handleLoadMore = () => {
    console.log('onLoadMore');
  };
  console.log('searchValue', searchValue);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
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
            <SearchInput onSearchChange={handleOnSearch} />
            <TransactionList
              data={TRANSACTIONS_MOCK}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
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
    scrollContainer: {
      paddingTop: 16,
      paddingBottom: 40,
    },
    content: {
      paddingHorizontal: 20,
      marginTop: 32,
      flexDirection: 'column',
      gap: 30,
    },
  });
};
