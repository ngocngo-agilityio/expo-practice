// Libs
import { render } from '@/test-utils';
import React from 'react';
import * as ReactNative from 'react-native';
import { Text, View } from 'react-native';

// Components
import KeyboardAwareScrollView from '..';

describe('KeyboardAwareScrollView Component', () => {
  it('should match snapshot', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(
      <KeyboardAwareScrollView>
        <View>
          <Text>Test Content</Text>
        </View>
      </KeyboardAwareScrollView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <KeyboardAwareScrollView>
        <View>
          <Text>Test Content</Text>
        </View>
      </KeyboardAwareScrollView>,
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('passes props to underlying component', () => {
    const { UNSAFE_root } = render(
      <KeyboardAwareScrollView testID="scroll-view">
        <View>
          <Text>Test</Text>
        </View>
      </KeyboardAwareScrollView>,
    );
    expect(UNSAFE_root).toBeTruthy();
  });
});
