import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import {
  ActivityIndicator,
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
import RecipientListSkeleton from './RecipientListSkeleton';

// Types
import { TRecipient } from '@/types';

// Themes
import { colors } from '@/themes';

// Styles
import { createSendToStyles } from './styles';

type TSendToProps = {
  containerStyles?: StyleProp<ViewStyle>;
  recipients: TRecipient[];
  isFetchingNextPage?: boolean;
  onLoadMore: () => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onPlusIconPress: () => void;
  isLoading?: boolean;
};

const SendTo = ({
  containerStyles,
  recipients,
  selectedId,
  onSelect,
  onPlusIconPress,
  isFetchingNextPage = false,
  onLoadMore,
  isLoading = false,
}: TSendToProps) => {
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createSendToStyles(scheme);

  const getKeyExtractor = (item: TRecipient) => {
    const { id } = item || {};

    return id;
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.title}>Send to</Text>

      <View style={styles.addRow}>
        <TouchableOpacity style={styles.addButton} onPress={onPlusIconPress}>
          <View style={styles.plus}>
            <PlusIcon />
          </View>
          <Text size="xs" style={styles.name}>
            Add
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <RecipientListSkeleton />
        ) : (
          <FlashList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            data={recipients}
            keyExtractor={getKeyExtractor}
            renderItem={({ item }) => {
              const {
                id = '',
                recipientUser,
                recipientAccountId = '',
              } = item || {};
              const { avatar = USER_DEFAULT_AVATAR, fullName = '' } =
                recipientUser || {};

              return (
                <TouchableOpacity
                  key={id}
                  style={styles.itemWrapper}
                  onPress={() => onSelect(recipientAccountId)}>
                  <Image
                    source={{ uri: avatar }}
                    contentFit="cover"
                    style={[
                      styles.avatar,
                      selectedId === item.recipientAccountId &&
                        styles.itemSelected,
                    ]}
                  />

                  <Text style={styles.name}>{fullName}</Text>
                </TouchableOpacity>
              );
            }}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  size="large"
                  color={colors.activityIndicator}
                />
              ) : null
            }
            ListEmptyComponent={
              <Text size="xs" style={styles.noItems}>
                No recipients in list
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default memo(SendTo);
