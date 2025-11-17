import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants
import { ThemeScheme } from '@/constants';

// Types
import { TEditProfileData, TThemeScheme } from '@/types';

// Components
import {
  AppHeader,
  EditProfileForm,
  KeyboardAwareScrollView,
} from '@/components';

// Themes
import { colors } from '@/themes';

export default function EditProfileScreen() {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <AppHeader title="Edit Profile" />

          <View style={styles.content}>
            <EditProfileForm
              avatar="https://sm.ign.com/t/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.600.jpg"
              fullName="Nguyen Van A"
              email="a@gmail.com"
              phoneNumber="+840364675651"
              birthDate={new Date('12-10-1999')}
              position="Senior Designer"
              startAt={new Date('23-4-2024')}
              onSubmit={(data: TEditProfileData) => console.log('data', data)}
              isSubmitting={false}
              clearErrorAPI={() => {
                console.log('clearErrorAPI');
              }}
              errorAPI=""
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
    },
  });
};
