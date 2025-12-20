import {
  formatCurrency,
  formatPercentage,
  formatBracketRange,
} from '../../helpers/formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(0.1)).toBe('10.00%');
      expect(formatPercentage(0.25)).toBe('25.00%');
      expect(formatPercentage(0.1234)).toBe('12.34%');
    });
  });

  describe('formatBracketRange', () => {
    it('should format bracket range with max', () => {
      expect(formatBracketRange(0, 10000)).toBe('$0 - $10,000');
      expect(formatBracketRange(10000, 20000)).toBe('$10,000 - $20,000');
    });

    it('should format bracket range without max', () => {
      expect(formatBracketRange(20000, undefined)).toBe('$20,000+');
      expect(
        formatBracketRange(20000, null as unknown as number | undefined)
      ).toBe('$20,000+');
    });
  });
});
