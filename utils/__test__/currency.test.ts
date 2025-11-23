import { formatCurrency } from '../currency';

describe('formatCurrency', () => {
  it('should format currency with default value 0', () => {
    const result = formatCurrency();
    expect(result).toBe('$0.00');
  });

  it('should format positive currency correctly', () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe('$1,234.56');
  });

  it('should format negative currency correctly', () => {
    const result = formatCurrency(-1234.56);
    expect(result).toBe('-$1,234.56');
  });

  it('should format large numbers with commas', () => {
    const result = formatCurrency(1000000);
    expect(result).toBe('$1,000,000.00');
  });

  it('should format decimal numbers with 2 decimal places', () => {
    const result = formatCurrency(99.9);
    expect(result).toBe('$99.90');
  });

  it('should format zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toBe('$0.00');
  });

  it('should format small decimal numbers correctly', () => {
    const result = formatCurrency(0.99);
    expect(result).toBe('$0.99');
  });

  it('should format very large numbers correctly', () => {
    const result = formatCurrency(999999999.99);
    expect(result).toBe('$999,999,999.99');
  });
});
