import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

// Constants
import { ThemeScheme, USER_DEFAULT_AVATAR } from '@/constants';

// Components
import { Text } from '@/components';
import { PlusIcon } from '@/components/icons';

// Types
import { TRecipient } from '@/types';

// Styles
import { createSendToStyles } from './styles';

type TSendToProps = {
  recipients: TRecipient[];
  selectedId: string | null;
  containerStyles?: StyleProp<ViewStyle>;
  onSelect: (id: string) => void;
  onAdd: () => void;
};

const SendTo = ({
  recipients,
  selectedId,
  containerStyles,
  onSelect,
  onAdd,
}: TSendToProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createSendToStyles(scheme);

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.title}>Send to</Text>

      <View style={styles.addRow}>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <View style={styles.plus}>
            <PlusIcon />
          </View>
          <Text size="xs" style={styles.name}>
            Add
          </Text>
        </TouchableOpacity>

        <FlashList
          data={recipients}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const { id = '', recipientUser } = item || {};
            const { avatar = USER_DEFAULT_AVATAR, fullName = '' } =
              recipientUser || {};

            return (
              <TouchableOpacity
                key={id}
                style={styles.itemWrapper}
                onPress={() => onSelect(id)}>
                <Image
                  source={{ uri: avatar }}
                  contentFit="cover"
                  style={[
                    styles.avatar,
                    selectedId === item.id && styles.itemSelected,
                  ]}
                />

                <Text style={styles.name}>{fullName}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default memo(SendTo);
