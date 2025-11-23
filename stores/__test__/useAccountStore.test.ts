import { act, renderHook } from '@/test-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccountStore } from '../useAccountStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useAccountStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const { result } = renderHook(() => useAccountStore()) as any;
    act(() => {
      result.current.setAccountId(null as any);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial state', () => {
    it('should have initial accountId as null', () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const { result } = renderHook(() => useAccountStore());
      const current = result.current as { accountId: string | null };

      expect(current.accountId).toBeNull();
    });
  });

  describe('setAccountId', () => {
    it('should set accountId correctly', () => {
      const { result } = renderHook(() => useAccountStore());
      const accountId = 'account-123';

      act(() => {
        (result.current as { setAccountId: (id: string) => void }).setAccountId(
          accountId,
        );
      });

      expect((result.current as { accountId: string | null }).accountId).toBe(
        accountId,
      );
    });

    it('should update accountId when called multiple times', () => {
      const { result } = renderHook(() => useAccountStore());
      const firstAccountId = 'account-123';
      const secondAccountId = 'account-456';

      act(() => {
        (result.current as { setAccountId: (id: string) => void }).setAccountId(
          firstAccountId,
        );
      });

      expect((result.current as { accountId: string | null }).accountId).toBe(
        firstAccountId,
      );

      act(() => {
        (result.current as { setAccountId: (id: string) => void }).setAccountId(
          secondAccountId,
        );
      });

      expect((result.current as { accountId: string | null }).accountId).toBe(
        secondAccountId,
      );
    });

    it('should persist accountId to AsyncStorage', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      const { result } = renderHook(() => useAccountStore());
      const accountId = 'account-123';

      act(() => {
        (result.current as { setAccountId: (id: string) => void }).setAccountId(
          accountId,
        );
      });

      // Wait for async operations
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should handle empty string accountId', () => {
      const { result } = renderHook(() => useAccountStore());

      act(() => {
        (result.current as { setAccountId: (id: string) => void }).setAccountId(
          '',
        );
      });

      expect((result.current as { accountId: string | null }).accountId).toBe(
        '',
      );
    });
  });
});
