import {
  KeyboardAwareScrollView as KeyboardAwareScrollViewBase,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollView = ({
  children,
  ...rest
}: KeyboardAwareScrollViewProps) => (
  <KeyboardAwareScrollViewBase
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    enableOnAndroid
    {...rest}>
    {children}
  </KeyboardAwareScrollViewBase>
);

export default KeyboardAwareScrollView;
