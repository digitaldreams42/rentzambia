# Testing Documentation

This document outlines the testing strategy and procedures for the RentZambia application.

## Testing Strategy

The RentZambia application follows a comprehensive testing approach that includes:

1. **Unit Testing** - Testing individual components and functions in isolation
2. **Integration Testing** - Testing interactions between components and services
3. **End-to-End Testing** - Testing complete user workflows
4. **Accessibility Testing** - Ensuring compliance with WCAG standards
5. **Performance Testing** - Testing application speed and responsiveness
6. **Security Testing** - Identifying potential vulnerabilities

## Testing Tools

### Unit and Integration Testing

- **Jest** - JavaScript testing framework
- **React Testing Library** - For testing React components
- **@testing-library/jest-dom** - Custom jest matchers for DOM assertions

### End-to-End Testing

- **Cypress** - For end-to-end testing
- **Playwright** - Alternative E2E testing framework

### Accessibility Testing

- **axe-core** - Accessibility testing engine
- **jest-axe** - Jest matcher for axe

### Performance Testing

- **Lighthouse** - For performance and SEO auditing
- **Web Vitals** - For measuring core web vitals

### Security Testing

- **OWASP ZAP** - For security scanning
- **Snyk** - For dependency vulnerability scanning

## Test Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── tenant/
│   │   ├── landlord/
│   │   └── admin/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── utils/
├── __mocks__/
│   ├── next/
│   ├── next-auth/
│   └── fileMock.js
└── __snapshots__/
```

## Unit Testing

### Component Testing

Testing React components using React Testing Library:

```javascript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('bg-destructive');
  });
});
```

### Hook Testing

Testing custom hooks:

```javascript
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth', () => {
  it('initializes with no user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('logs in a user', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe('user@example.com');
  });
});
```

### Utility Function Testing

Testing utility functions:

```javascript
import { formatCurrency, formatDate } from '@/lib/utils';

describe('utils', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1500)).toBe('K1,500');
      expect(formatCurrency(1500, '$')).toBe('$1,500');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2025-03-15';
      expect(formatDate(date)).toBe('Mar 15, 2025');
    });
  });
});
```

## Integration Testing

### API Service Testing

Testing API service functions:

```javascript
import { ApiService } from '@/services/apiService';

describe('ApiService', () => {
  beforeEach(() => {
    // Mock fetch or axios
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProperties', () => {
    it('fetches properties successfully', async () => {
      const mockProperties = [{ id: 1, title: 'Test Property' }];
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockProperties),
        ok: true
      });

      const properties = await ApiService.getProperties();
      expect(properties).toEqual(mockProperties);
      expect(global.fetch).toHaveBeenCalledWith('/api/v1/properties');
    });
  });
});
```

## End-to-End Testing

### Cypress Tests

Testing user workflows with Cypress:

```javascript
describe('Tenant Property Search', () => {
  beforeEach(() => {
    cy.visit('/tenant');
  });

  it('allows tenants to search for properties', () => {
    cy.get('[data-testid="search-input"]').type('Kabulonga');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="property-card"]').should(
      'have.length.greaterThan',
      0
    );
  });

  it('allows tenants to view property details', () => {
    cy.get('[data-testid="property-card"]').first().click();
    cy.url().should('include', '/property/');
    cy.get('[data-testid="property-title"]').should('exist');
  });
});
```

## Accessibility Testing

### axe-core Integration

Testing accessibility compliance:

```javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PropertyCard } from '@/components/tenant/PropertyCard';

expect.extend(toHaveNoViolations);

describe('PropertyCard', () => {
  it('has no accessibility violations', async () => {
    const property = {
      id: 1,
      title: 'Test Property',
      location: 'Test Location',
      price: 1500,
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      type: 'apartment',
      furnished: true,
      images: ['test-image.jpg'],
      isFavorite: false,
      landlord: {
        name: 'Test Landlord',
        rating: 4.5,
      },
    };

    const { container } = render(<PropertyCard property={property} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Performance Testing

### Web Vitals Testing

Testing core web vitals:

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

describe('Web Vitals', () => {
  it('measures core web vitals', () => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
});
```

## Test Commands

### Running Tests

1. **Run all tests:**

   ```bash
   npm test
   ```

2. **Run tests in watch mode:**

   ```bash
   npm test -- --watch
   ```

3. **Run tests with coverage:**

   ```bash
   npm test -- --coverage
   ```

4. **Run specific test file:**

   ```bash
   npm test src/__tests__/components/ui/button.test.tsx
   ```

5. **Run E2E tests:**

   ```bash
   npm run test:e2e
   ```

6. **Run accessibility tests:**
   ```bash
   npm run test:a11y
   ```

## Test Configuration

### Jest Configuration

`jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
};
```

### Cypress Configuration

`cypress.config.js`:

```javascript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
```

## Code Coverage

The project aims for the following code coverage targets:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 85%
- **Lines**: 80%

Coverage reports are generated in the `coverage/` directory.

## Continuous Integration

GitHub Actions workflow for testing:

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --coverage

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

## Best Practices

1. **Write tests first** - Follow TDD principles where possible
2. **Test behavior, not implementation** - Focus on what the code does, not how it does it
3. **Keep tests isolated** - Each test should be independent
4. **Use descriptive test names** - Clearly describe what is being tested
5. **Mock external dependencies** - Isolate the code under test
6. **Test edge cases** - Include boundary conditions and error cases
7. **Maintain test data** - Use consistent and realistic test data
8. **Regular test maintenance** - Keep tests up to date with code changes

## Troubleshooting

### Common Issues

1. **Tests failing due to async code**: Use `act()` or `waitFor()`
2. **Mocking issues**: Ensure mocks are properly configured
3. **Environment variables**: Set up test environment variables
4. **Network requests**: Mock API calls in tests

### Debugging Tests

1. Use `console.log` statements in tests
2. Run tests in debug mode
3. Use Jest's `--verbose` flag for detailed output
4. Check test coverage reports for untested code

## Contributing to Tests

When adding new tests:

1. Follow existing test patterns and conventions
2. Ensure tests are readable and maintainable
3. Cover both happy paths and error cases
4. Update test documentation when adding new test types
5. Run full test suite before submitting changes

## Test Data Management

Use factories for generating test data:

```javascript
// test/factories/propertyFactory.js
export const createProperty = (overrides = {}) => ({
  id: Math.floor(Math.random() * 1000),
  title: 'Test Property',
  location: 'Test Location',
  price: 1500,
  bedrooms: 2,
  bathrooms: 1,
  area: 80,
  type: 'apartment',
  furnished: true,
  images: ['test-image.jpg'],
  isFavorite: false,
  landlord: {
    name: 'Test Landlord',
    rating: 4.5,
  },
  ...overrides,
});
```

## Performance Considerations

1. **Mock expensive operations** - Database calls, API requests
2. **Use test-specific configurations** - Faster timeouts, simplified setups
3. **Parallelize tests** - Run tests concurrently when possible
4. **Clean up after tests** - Remove test data, reset mocks

## Security Testing

Regular security testing includes:

1. **Dependency scanning** - Check for vulnerable packages
2. **Input validation testing** - Test for injection attacks
3. **Authentication testing** - Verify auth flows
4. **Authorization testing** - Check role-based access
