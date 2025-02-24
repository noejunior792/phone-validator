/**
 * Supported country codes and their validation rules
 */
export interface CountryRule {
  /** Minimum length of the phone number without country code */
  minLength: number;
  /** Maximum length of the phone number without country code */
  maxLength: number;
  /** Regular expression pattern for the phone number format */
  pattern: RegExp;
  /** Example format for error messages */
  example: string;
}

/**
 * Validation configuration options
 */
export interface ValidationOptions {
  /** Allow spaces in the phone number */
  allowSpaces?: boolean;
  /** Allow hyphens in the phone number */
  allowHyphens?: boolean;
  /** Allow parentheses in the phone number */
  allowParentheses?: boolean;
  /** Custom error messages */
  messages?: {
    invalid?: string;
    tooShort?: string;
    tooLong?: string;
    invalidFormat?: string;
  };
}

/**
 * Validation result object
 */
export interface ValidationResult {
  /** Whether the phone number is valid */
  isValid: boolean;
  /** Normalized phone number (digits only) */
  normalizedNumber?: string;
  /** Error message if validation failed */
  error?: string;
  /** Original input */
  originalInput: string;
  /** Country code used for validation */
  countryCode: string;
}
