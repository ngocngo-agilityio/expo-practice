import { act, renderHook } from '@/test-utils';
import { useErrorAPI } from '../useErrorAPI';

interface UseErrorAPIProps {
  errorMessage: string;
}

type UseErrorAPIReturn = ReturnType<typeof useErrorAPI>;

describe('useErrorAPI', () => {
  it('should return initial empty errorAPI', () => {
    const { result } = renderHook(() => useErrorAPI(''));
    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('');
    expect(typeof (result.current as UseErrorAPIReturn).setErrorAPI).toBe(
      'function',
    );
    expect(typeof (result.current as UseErrorAPIReturn).clearErrorAPI).toBe(
      'function',
    );
  });

  it('should set errorAPI when errorMessage is provided', () => {
    const { result } = renderHook(() => useErrorAPI('Test error message'));

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe(
      'Test error message',
    );
  });

  it('should update errorAPI when errorMessage changes', () => {
    const { result, rerender } = renderHook(
      ({ errorMessage }: UseErrorAPIProps) => useErrorAPI(errorMessage),
      {
        initialProps: { errorMessage: 'First error' },
      },
    );

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('First error');

    rerender({ errorMessage: 'Second error' });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Second error');
  });

  it('should not update errorAPI when errorMessage is empty', () => {
    const { result, rerender } = renderHook(
      ({ errorMessage }: UseErrorAPIProps) => useErrorAPI(errorMessage),
      {
        initialProps: { errorMessage: 'Initial error' },
      },
    );

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe(
      'Initial error',
    );

    rerender({ errorMessage: '' });

    // Should keep the previous error message when new one is empty
    expect((result.current as UseErrorAPIReturn).errorAPI).toBe(
      'Initial error',
    );
  });

  it('should allow manual setting of errorAPI', () => {
    const { result } = renderHook(() => useErrorAPI(''));

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('');

    act(() => {
      (result.current as UseErrorAPIReturn).setErrorAPI('Manual error');
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Manual error');
  });

  it('should clear errorAPI using clearErrorAPI function', () => {
    const { result } = renderHook(() => useErrorAPI('Test error'));

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Test error');

    act(() => {
      (result.current as UseErrorAPIReturn).clearErrorAPI();
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('');
  });

  it('should handle multiple setErrorAPI calls', () => {
    const { result } = renderHook(() => useErrorAPI(''));

    act(() => {
      (result.current as UseErrorAPIReturn).setErrorAPI('Error 1');
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Error 1');

    act(() => {
      (result.current as UseErrorAPIReturn).setErrorAPI('Error 2');
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Error 2');
  });

  it('should handle clearErrorAPI after setErrorAPI', () => {
    const { result } = renderHook(() => useErrorAPI(''));

    act(() => {
      (result.current as UseErrorAPIReturn).setErrorAPI('Some error');
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('Some error');

    act(() => {
      (result.current as UseErrorAPIReturn).clearErrorAPI();
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('');

    act(() => {
      (result.current as UseErrorAPIReturn).setErrorAPI('New error');
    });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('New error');
  });

  it('should update errorAPI when errorMessage prop changes from empty to non-empty', () => {
    const { result, rerender } = renderHook(
      ({ errorMessage }: UseErrorAPIProps) => useErrorAPI(errorMessage),
      {
        initialProps: { errorMessage: '' },
      },
    );

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe('');

    rerender({ errorMessage: 'New error message' });

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe(
      'New error message',
    );
  });

  it('should handle long error messages', () => {
    const longErrorMessage = 'A'.repeat(1000);
    const { result } = renderHook(() => useErrorAPI(longErrorMessage));

    expect((result.current as UseErrorAPIReturn).errorAPI).toBe(
      longErrorMessage,
    );
    expect((result.current as UseErrorAPIReturn).errorAPI.length).toBe(1000);
  });
});
