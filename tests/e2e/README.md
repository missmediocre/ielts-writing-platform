# E2E Testing Guide

## Setup

1. Install Playwright browsers:
```bash
npx playwright install
```

2. Install dependencies:
```bash
npm install --save-dev @playwright/test
```

## Running Tests

### All Tests
```bash
npm run test:e2e
```

### Interactive Mode
```bash
npm run test:e2e:ui
```

### Debug Mode
```bash
npm run test:e2e:debug
```

### Specific Test File
```bash
npx playwright test tests/e2e/homepage.spec.ts
```

## Test Structure

- `homepage.spec.ts` - Homepage and navigation tests
- `writing-assessment.spec.ts` - Essay submission and AI feedback
- `progress-tracking.spec.ts` - User dashboard and progress
- `fixtures/test-data.ts` - Test data and expected results

## Configuration

- Playwright config: `playwright.config.ts`
- Test server runs on `http://localhost:5173`
- Supports desktop and mobile browsers
- Includes screenshots on failure