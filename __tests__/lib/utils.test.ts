// __tests__/lib/utils.test.ts
import { cn, formatCurrency, formatDate, capitalizeFirstLetter, truncateText } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('class1', 'class2', { conditional: true });
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('conditional');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with default symbol', () => {
      expect(formatCurrency(1500)).toBe('K1,500');
    });

    it('formats currency with custom symbol', () => {
      expect(formatCurrency(1500, '$')).toBe('$1,500');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2025-03-15';
      expect(formatDate(date)).toBe('Mar 15, 2025');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('capitalizes first letter of string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than max length', () => {
      const text = 'This is a long text that should be truncated';
      expect(truncateText(text, 20)).toBe('This is a long text...');
    });

    it('does not truncate text shorter than max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });
  });
});