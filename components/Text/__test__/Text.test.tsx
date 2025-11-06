import { render, screen } from '@/test-utils';
import * as ReactNative from 'react-native';

// Components
import Text from '..';

describe('Text component', () => {
  it('should render properly', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null);
    const { toJSON } = render(<Text> Hello World!</Text>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct content in the text', () => {
    render(<Text>Hello World!</Text>);
    expect(screen.getByText('Hello World!')).toBeVisible();
  });
});
