/**
 * @description This function formats currency into USD
 * @param {number} currency - Currency amount to format
 * @returns {string} - Formatted currency in USD
 */
export const formatCurrency = (currency: number = 0): string => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(currency);

  return formattedCurrency;
};
