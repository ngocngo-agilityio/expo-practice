import { useEffect } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Constants
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ThemeScheme,
  USER_DEFAULT_AVATAR,
} from '@/constants';

// Types
import { TEditProfileData, TThemeScheme } from '@/types';

// Components
import {
  AppHeader,
  EditProfileForm,
  KeyboardAwareScrollView,
  LoadingIndicator,
} from '@/components';

// Themes
import { colors } from '@/themes';

// Apis
import { uploadToCloudinary, useGetUserInfo, useUpdateProfile } from '@/apis';

// Stores
import { useAuthStore } from '@/stores';

// Hooks
import { useErrorAPI } from '@/hooks';

export default function EditProfileScreen() {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createStyles(theme);

  // Stores
  const user = useAuthStore(state => state.user);

  const userId = user?.id ?? '';

  // Apis
  const { data: profile, isFetching, error } = useGetUserInfo(userId);
  const { mutate: updateProfile, error: updateProfileError } =
    useUpdateProfile(userId);

  const { errorAPI, clearErrorAPI } = useErrorAPI(updateProfileError ?? '');

  const { user: userProfile } = profile || {};
  const {
    avatar = USER_DEFAULT_AVATAR,
    email = '',
    phoneNumber = '',
    birthDate = new Date(),
    fullName = '',
  } = userProfile || {};

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  }, [error]);

  const handleUpdateFailed = (error: string): void => {
    Toast.show({ type: 'error', text1: error });
  };

  const handleUpdateSuccess = (): void => {
    Toast.show({ type: 'success', text1: SUCCESS_MESSAGES.UPDATE_PROFILE });
  };

  const handleUpdateProfile = async (data: TEditProfileData) => {
    try {
      let avatarUrl = data.avatar;

      // Check if avatar is from device (local URI)
      const isLocalImage =
        data.avatar &&
        !data.avatar.startsWith('http://') &&
        !data.avatar.startsWith('https://');

      if (isLocalImage) {
        // Upload image to Cloudinary first
        avatarUrl = await uploadToCloudinary(data.avatar || '');
      }

      // Update profile with the avatar URL
      updateProfile(
        { ...data, avatar: avatarUrl },
        {
          onSuccess: handleUpdateSuccess,
          onError: handleUpdateFailed,
        },
      );
    } catch (error) {
      // Handle upload error
      const errorMessage =
        typeof error === 'string' ? error : ERROR_MESSAGES.UPLOAD_IMAGE;
      handleUpdateFailed(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}>
            {/* {isPending && <LoadingIndicator />} */}
            <AppHeader title="Edit Profile" />

            <View style={styles.content}>
              <EditProfileForm
                avatar={avatar}
                fullName={fullName}
                email={email}
                phoneNumber={phoneNumber}
                birthDate={new Date(birthDate)}
                position="Senior Designer"
                startAt={new Date('2024-04-13')}
                onSubmit={handleUpdateProfile}
                clearErrorAPI={clearErrorAPI}
                errorAPI={errorAPI}
              />
            </View>
          </KeyboardAwareScrollView>
        )}
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
