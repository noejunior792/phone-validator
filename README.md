# Phone Validator

A lightweight, zero-dependency phone number validation library with support for international formats.

## Features

- Validates phone numbers against country-specific patterns
- Supports multiple input formats (spaces, dashes, parentheses)
- Provides detailed validation results
- Written in TypeScript with full type support
- Zero dependencies
- Comprehensive test coverage

## Installation

```bash
npm install phone-gateway
```

## Usage

```typescript
import { validatePhoneNumber } from 'phone-gateway';

// Basic usage
const result = validatePhoneNumber('+1 (555) 555-5555', 'US');
console.log(result);
// {
//   isValid: true,
//   normalizedNumber: '5555555555',
//   originalInput: '+1 (555) 555-5555',
//   countryCode: 'US'
// }

// With custom options
const result2 = validatePhoneNumber('555.555.5555', 'US', {
  allowSpaces: false,
  allowHyphens: false,
  allowParentheses: false,
  messages: {
    invalidFormat: 'Please enter a valid phone number'
  }
});

// Invalid number
const result3 = validatePhoneNumber('123', 'US');
console.log(result3);
// {
//   isValid: false,
//   error: 'Phone number is too short',
//   originalInput: '123',
//   countryCode: 'US'
// }
```

## Supported Countries

- US (United States)
- BR (Brazil)
- GB (United Kingdom)

More countries can be added by contributing to the project.

## API Reference

### validatePhoneNumber(phoneNumber, countryCode, options?)

Validates a phone number for a specific country.

#### Parameters

- `phoneNumber` (string): The phone number to validate
- `countryCode` (string): The ISO 2-letter country code (e.g., 'US', 'BR')
- `options` (ValidationOptions): Optional configuration object

#### ValidationOptions

```typescript
interface ValidationOptions {
  allowSpaces?: boolean;      // Default: true
  allowHyphens?: boolean;     // Default: true
  allowParentheses?: boolean; // Default: true
  messages?: {
    invalid?: string;
    tooShort?: string;
    tooLong?: string;
    invalidFormat?: string;
  };
}
```

#### Returns

```typescript
interface ValidationResult {
  isValid: boolean;
  normalizedNumber?: string;
  error?: string;
  originalInput: string;
  countryCode: string;
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

For security issues, please read our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
