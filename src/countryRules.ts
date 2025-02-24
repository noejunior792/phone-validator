import type { CountryRule } from './types';

/**
 * Country-specific validation rules
 */
export const countryRules: Record<string, CountryRule> = {
  US: {
    minLength: 10,
    maxLength: 10,
    pattern: /^(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    example: '+1 (555) 555-5555',
  },
  BR: {
    minLength: 10,
    maxLength: 11,
    pattern:
      /^(?:\+?55[-. ]?)?(?:\([1-9][0-9]\)|[1-9][0-9])[-. ]?(?:[2-9][0-9]{3,4})[-. ]?([0-9]{4})$/,
    example: '+55 (11) 98765-4321',
  },
  GB: {
    minLength: 10,
    maxLength: 11,
    pattern: /^(?:\+?44[-. ]?)?(?:0)?([1-9][0-9]{8,9})$/,
    example: '+44 7911 123456',
  },
  // Add more country rules as needed
};
