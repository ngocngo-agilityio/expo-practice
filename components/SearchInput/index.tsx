// Libs
import {
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

// Hooks
import { useDebounce } from '@/hooks';

// Styles
import { CloseIcon, SearchIcon } from '../icons';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { colors } from '@/themes';
import { createSearchStyles } from './styles';

type InputProps = PropsWithChildren<TextInputProps> & {
  onSearchChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const SearchInput = ({
  placeholder = 'Search',
  onSearchChange,
  containerStyle,
  inputStyle,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: InputProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchValue = useDebounce(searchQuery, 500);
  const scheme = useColorScheme() ?? ThemeScheme.Light;
  const styles = useMemo(() => createSearchStyles(scheme), [scheme]);

  const clearSearchText = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Call the debounced search callback
  useEffect(() => {
    onSearchChange(debouncedSearchValue);
  }, [debouncedSearchValue, onSearchChange]);

  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <SearchIcon />

      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderText}
        onChangeText={setSearchQuery}
        value={searchQuery}
        accessibilityRole="search"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...rest}
      />

      {searchQuery && (
        <TouchableOpacity
          onPress={clearSearchText}
          accessibilityRole="button"
          accessibilityLabel="Clear search text"
          accessibilityHint="Clears all text from the search field">
          <CloseIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchInput);
