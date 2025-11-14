import { Image } from 'expo-image';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import {
  QuickActionGroup,
  Text,
  TransactionList,
  VirtualCard,
} from '@/components';
import { SearchIcon } from '@/components/icons';

// Constants
import { ThemeScheme } from '@/constants';

// Mock data
import { TRANSACTIONS_MOCK } from '@/mocks';

// Themes
import { BASE_COLORS, colors, fontFamilies } from '@/themes';

// Types
import { TThemeScheme } from '@/types';

export default function HomeScreen() {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  const avatar = 'https://i.pravatar.cc/150';
  const username = 'Tanya Myroniuk';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top']}>
        <View style={styles.header}>
          <Image source={{ uri: avatar }} style={styles.avatar} />

          <View style={styles.welcomeWrapper}>
            <Text size="xs" style={styles.welcomeText}>
              Welcome back,
            </Text>
            <Text size="md" style={styles.username}>
              {username}
            </Text>
          </View>

          <View style={styles.searchButton}>
            <SearchIcon
              color={
                theme === ThemeScheme.Light
                  ? BASE_COLORS.darkGunmetal
                  : BASE_COLORS.white
              }
            />
          </View>
        </View>

        <View style={styles.cardWrapper}>
          <VirtualCard
            cardNumber="4562112245957852"
            holderName="AR Jonson"
            expiry="24/2000"
            cvv="6986"
            brandLogo={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/320px-Mastercard-logo.png'
            }
            brandName="Mastercard"
          />
        </View>

        <QuickActionGroup />

        <View style={styles.transactionHeader}>
          <Text size="md" style={styles.transactionTitle}>
            Transaction
          </Text>
          <Text size="sm" style={styles.seeAll}>
            See All
          </Text>
        </View>

        <View style={styles.listWrapper}>
          <TransactionList data={TRANSACTIONS_MOCK} />
        </View>
      </SafeAreaView>
    </View>
  );
}

export const createStyles = (scheme: TThemeScheme) => {
  const theme = colors[scheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBg,
    },
    safeArea: {
      flex: 1,
      paddingTop: 16,
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },
    welcomeWrapper: {
      marginLeft: 16,
      flex: 1,
    },
    welcomeText: {
      color: colors.homeWelcome,
      paddingTop: 5,
    },
    username: {
      color: theme.homeUsername,
      fontFamily: fontFamilies.primary.medium,
      marginTop: 8,
      paddingBottom: 5,
    },
    searchButton: {
      width: 42,
      height: 42,
      borderRadius: 42 / 2,
      backgroundColor: theme.homeSearchBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardWrapper: {
      marginBottom: 30,
    },
    transactionHeader: {
      marginTop: 28,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transactionTitle: {
      color: theme.homeTransactionHeader,
      fontFamily: fontFamilies.primary.medium,
    },
    seeAll: {
      fontFamily: fontFamilies.primary.medium,
      color: colors.homeSeeAll,
    },
    listWrapper: {
      flex: 1,
    },
  });
};
