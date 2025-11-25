// Libs
import { memo } from 'react';
import { Modal, TouchableOpacity, useColorScheme, View } from 'react-native';

// Components
import { Text } from '@/components';

// Constants
import { ThemeScheme } from '@/constants';

// Styles
import { createModalStyles } from './styles';

export type TConfirmModalProps = {
  visible: boolean;
  message: string;
  confirmText: string;
  cancelText: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  visible,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: TConfirmModalProps) => {
  const theme = useColorScheme() ?? ThemeScheme.Light;
  const styles = createModalStyles(theme);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text size="base" style={[styles.modalText, styles.modalTitle]}>
            {message}
          </Text>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text size="base" style={styles.confirmText}>
              {confirmText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text size="base" style={styles.modalText}>
              {cancelText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ConfirmModal);
