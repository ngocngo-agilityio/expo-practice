import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { createDatePickerStyles } from './styles';

export type TDatePickerRef = {
  focus: () => void;
};

type TDatePickerProps = {
  label?: string;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  error?: string;
};

const DatePicker = forwardRef<TDatePickerRef, TDatePickerProps>(
  ({ label = 'Date', defaultValue = new Date(), onChange, error }, ref) => {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(defaultValue);

    const theme = useColorScheme() ?? ThemeScheme.Light;
    const isDark = theme === ThemeScheme.Dark;
    const styles = createDatePickerStyles(theme);

    const openPicker = useCallback(() => setShowPicker(true), []);
    const hidePicker = useCallback(() => setShowPicker(false), []);

    const handleOnChange = useCallback(
      (_: DateTimePickerEvent, picked: Date | undefined) => {
        if (Platform.OS === 'android') {
          hidePicker();
        }

        if (picked) {
          setDate(picked);
          onChange?.(picked);
        }
      },
      [hidePicker, onChange],
    );

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      focus() {
        setShowPicker(true);
      },
    }));

    return (
      <View style={styles.container}>
        <Text style={[styles.label]}>{label}</Text>

        {/* --- THREE COLUMNS --- */}
        <View style={styles.columns}>
          {/* DAY */}
          <TouchableOpacity onPress={openPicker} style={styles.column}>
            <Text style={styles.columnText}>{date.getDate()}</Text>
            <View
              style={[
                styles.columnUnderline,
                error ? styles.inputWrapperError : null,
              ]}
            />
          </TouchableOpacity>

          {/* MONTH */}
          <TouchableOpacity onPress={openPicker} style={styles.column}>
            <Text style={styles.columnText}>
              {date.toLocaleString('en', { month: 'long' })}
            </Text>
            <View
              style={[
                styles.columnUnderline,
                error ? styles.inputWrapperError : null,
              ]}
            />
          </TouchableOpacity>

          {/* YEAR */}
          <TouchableOpacity onPress={openPicker} style={styles.column}>
            <Text style={styles.columnText}>{date.getFullYear()}</Text>
            <View
              style={[
                styles.columnUnderline,
                error ? styles.inputWrapperError : null,
              ]}
            />
          </TouchableOpacity>

          {/* Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        {/* --- DATE PICKER POPUP --- */}
        {showPicker && (
          <Modal
            transparent
            animationType="fade"
            presentationStyle="overFullScreen">
            <View style={styles.modalOverlay}>
              {Platform.OS === 'ios' ? (
                <View style={styles.modalIOSContainer}>
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={handleOnChange}
                    themeVariant={isDark ? ThemeScheme.Dark : ThemeScheme.Light}
                  />

                  {/* Close button for iOS */}
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={hidePicker}
                      style={styles.modalDoneButton}>
                      <Text style={styles.modalDoneText}>Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={date}
                  onChange={handleOnChange}
                  themeVariant={isDark ? ThemeScheme.Dark : ThemeScheme.Light}
                />
              )}
            </View>
          </Modal>
        )}
      </View>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
