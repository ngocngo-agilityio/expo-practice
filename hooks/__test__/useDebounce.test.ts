import { act, renderHook } from '@/test-utils';
import { useDebounce } from '../useDebounce';

interface UseDebounceProps {
  value: string;
  delay: number;
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return initial empty string', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('');
  });

  it('should debounce value with default delay', () => {
    const { result } = renderHook(
      ({ value, delay }: UseDebounceProps) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 },
      },
    );

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test');
  });

  it('should debounce value with custom delay', () => {
    const { result } = renderHook(
      ({ value, delay }: UseDebounceProps) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 1000 },
      },
    );

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test');
  });

  it('should update debounced value when input changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: UseDebounceProps) => useDebounce(value, delay),
      {
        initialProps: { value: 'test1', delay: 500 },
      },
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test1');

    rerender({ value: 'test2', delay: 500 });

    expect(result.current).toBe('test1');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test2');
  });

  it('should reset timer when value changes before delay completes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: UseDebounceProps) => useDebounce(value, delay),
      {
        initialProps: { value: 'test1', delay: 500 },
      },
    );

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('');

    rerender({ value: 'test2', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('test2');
  });

  it('should clear timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce('test', 500));

    expect(result.current).toBe('');

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should not throw error
    expect(result.current).toBe('');
  });

  it('should handle empty string value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: UseDebounceProps) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 },
      },
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test');

    rerender({ value: '', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('');
  });

  it('should handle zero delay', () => {
    const { result } = renderHook(() => useDebounce('test', 0));

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toBe('test');
  });
});
