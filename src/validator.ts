import { countryRules } from './countryRules';
import type { ValidationOptions, ValidationResult } from './types';

/**
 * Default validation options
 */
const defaultOptions: ValidationOptions = {
  allowSpaces: true,
  allowHyphens: true,
  allowParentheses: true,
  messages: {
    invalid: 'Invalid phone number format',
    tooShort: 'Phone number is too short',
    tooLong: 'Phone number is too long',
    invalidFormat: 'Invalid phone number format for country',
  },
};

/**
 * Validates a phone number for a specific country
 * @param phoneNumber - The phone number to validate
 * @param countryCode - The ISO 2-letter country code (e.g., 'US', 'BR')
 * @param options - Validation options
 * @returns Validation result object
 */
export function validatePhoneNumber(
  phoneNumber: string,
  countryCode: string,
  options: ValidationOptions = {}
): ValidationResult {
  // Handle null/undefined inputs
  if (!phoneNumber || countryCode == null) {
    return {
      isValid: false,
      error: 'Phone number and country code are required',
      originalInput: phoneNumber || '',
      countryCode: countryCode || '',
    };
  }

  const mergedOptions = { ...defaultOptions, ...options };
  const countryRule = countryRules[countryCode.toUpperCase()];

  if (!countryRule) {
    return {
      isValid: false,
      error: `Unsupported country code: ${countryCode}`,
      originalInput: phoneNumber,
      countryCode,
    };
  }

  // Check format restrictions before normalization
  if (!mergedOptions.allowSpaces && /\s/.test(phoneNumber)) {
    return {
      isValid: false,
      error: 'Spaces are not allowed',
      originalInput: phoneNumber,
      countryCode,
    };
  }

  if (!mergedOptions.allowHyphens && /-/.test(phoneNumber)) {
    return {
      isValid: false,
      error: 'Hyphens are not allowed',
      originalInput: phoneNumber,
      countryCode,
    };
  }

  if (!mergedOptions.allowParentheses && /[()]/.test(phoneNumber)) {
    return {
      isValid: false,
      error: 'Parentheses are not allowed',
      originalInput: phoneNumber,
      countryCode,
    };
  }

  // Normalize the phone number
  let normalizedNumber = phoneNumber.replace(/\D/g, '');

  // Remove country code if present
  if (normalizedNumber.startsWith('1') && countryCode === 'US') {
    normalizedNumber = normalizedNumber.slice(1);
  } else if (normalizedNumber.startsWith('55') && countryCode === 'BR') {
    normalizedNumber = normalizedNumber.slice(2);
  }

  // Validate length
  if (normalizedNumber.length < countryRule.minLength) {
    return {
      isValid: false,
      error: mergedOptions.messages?.tooShort,
      originalInput: phoneNumber,
      countryCode,
    };
  }

  if (normalizedNumber.length > countryRule.maxLength) {
    return {
      isValid: false,
      error: mergedOptions.messages?.tooLong,
      originalInput: phoneNumber,
      countryCode,
    };
  }

  // Validate format using country-specific pattern
  if (!countryRule.pattern.test(phoneNumber)) {
    return {
      isValid: false,
      error: `${mergedOptions.messages?.invalidFormat}. Example: ${countryRule.example}`,
      originalInput: phoneNumber,
      countryCode,
    };
  }

  return {
    isValid: true,
    normalizedNumber,
    originalInput: phoneNumber,
    countryCode,
  };
}
