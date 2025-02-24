import { describe, it, expect } from 'vitest';
import { validatePhoneNumber } from '../validator';

describe('validatePhoneNumber', () => {
  describe('US phone numbers', () => {
    it('validates correct US phone numbers', () => {
      const validNumbers = ['+1 (555) 555-5555', '(555) 555-5555', '555-555-5555', '5555555555'];

      validNumbers.forEach((number) => {
        const result = validatePhoneNumber(number, 'US');
        expect(result.isValid).toBe(true);
        expect(result.normalizedNumber).toBe('5555555555');
      });
    });

    it('rejects invalid US phone numbers', () => {
      const invalidNumbers = [
        '+1 (555) 555-555', // too short
        '(555) 555-55559', // too long
        'abc-def-ghij', // non-numeric
        '(555) 5555-5555', // wrong format
      ];

      invalidNumbers.forEach((number) => {
        const result = validatePhoneNumber(number, 'US');
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  describe('BR phone numbers', () => {
    it('validates correct BR phone numbers', () => {
      const validNumbers = [
        '+55 (11) 98765-4321',
        '(11) 98765-4321',
        '11987654321',
        '1198765-4321',
      ];

      validNumbers.forEach((number) => {
        const result = validatePhoneNumber(number, 'BR');
        expect(result.isValid).toBe(true);
      });
    });

    it('rejects invalid BR phone numbers', () => {
      const invalidNumbers = [
        '+55 (11) 9876-432', // too short
        '(00) 98765-4321', // invalid area code
        'abc-def-ghij', // non-numeric
        '(11) 98765-43210', // too long
      ];

      invalidNumbers.forEach((number) => {
        const result = validatePhoneNumber(number, 'BR');
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });
  });

  describe('Validation options', () => {
    it('respects allowSpaces option', () => {
      const result = validatePhoneNumber('555 555 5555', 'US', { allowSpaces: false });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Spaces are not allowed');
    });

    it('respects allowHyphens option', () => {
      const result = validatePhoneNumber('555-555-5555', 'US', { allowHyphens: false });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Hyphens are not allowed');
    });

    it('respects allowParentheses option', () => {
      const result = validatePhoneNumber('(555) 555-5555', 'US', { allowParentheses: false });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Parentheses are not allowed');
    });
  });

  describe('Error handling', () => {
    it('handles empty input', () => {
      const result = validatePhoneNumber('', 'US');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number and country code are required');
    });

    it('handles invalid country codes', () => {
      const result = validatePhoneNumber('555-555-5555', 'XX');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Unsupported country code: XX');
    });

    it('handles null and undefined country codes', () => {
      // @ts-expect-error Testing invalid input
      const result1 = validatePhoneNumber('555-555-5555', null);
      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('Phone number and country code are required');

      // @ts-expect-error Testing invalid input
      const result2 = validatePhoneNumber('555-555-5555', undefined);
      expect(result2.isValid).toBe(false);
      expect(result2.error).toBe('Phone number and country code are required');
    });
  });
});
