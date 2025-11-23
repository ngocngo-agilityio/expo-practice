import * as SecureStore from 'expo-secure-store';
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
} from '../secure-store';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('secure-store utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setSecureItem', () => {
    it('should call SecureStore.setItemAsync with correct parameters', async () => {
      const key = 'test-key';
      const value = 'test-value';
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      await setSecureItem(key, value);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, value);
      expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1);
    });

    it('should return a promise that resolves', async () => {
      const key = 'test-key';
      const value = 'test-value';
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      await expect(setSecureItem(key, value)).resolves.toBeUndefined();
    });
  });

  describe('getSecureItem', () => {
    it('should call SecureStore.getItemAsync with correct key', async () => {
      const key = 'test-key';
      const value = 'test-value';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(value);

      await getSecureItem(key);

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith(key);
      expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
    });

    it('should return the value from SecureStore.getItemAsync', async () => {
      const key = 'test-key';
      const value = 'test-value';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(value);

      const result = await getSecureItem(key);

      expect(result).toBe(value);
    });

    it('should return null when item does not exist', async () => {
      const key = 'non-existent-key';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await getSecureItem(key);

      expect(result).toBeNull();
    });
  });

  describe('deleteSecureItem', () => {
    it('should call SecureStore.deleteItemAsync with correct key', async () => {
      const key = 'test-key';
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);

      await deleteSecureItem(key);

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key);
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(1);
    });

    it('should return a promise that resolves', async () => {
      const key = 'test-key';
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);

      await expect(deleteSecureItem(key)).resolves.toBeUndefined();
    });
  });
});
