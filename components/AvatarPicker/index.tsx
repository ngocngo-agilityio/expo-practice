import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { memo, useCallback, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

// Styles
import { styles } from './styles';

type TAvatarPickerProps = {
  size?: number;
  initialUri?: string;
  onChange?: (uri: string) => void;
};

const AvatarPicker = ({
  size = 90,
  initialUri,
  onChange,
}: TAvatarPickerProps) => {
  const [avatar, setAvatar] = useState(initialUri ?? '');

  const pickImage = useCallback(async () => {
    // Ask permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Allow access to your photos to choose avatar.',
      );
      return;
    }

    // Open picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setAvatar(uri);
      onChange?.(uri);
    }
  }, [onChange]);

  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
      <Image
        source={avatar}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
};

export default memo(AvatarPicker);
