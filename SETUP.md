# Development Setup Guide

## Quick Setup (Due to npm permission issues)

### Option 1: Fix npm permissions (Recommended)
```bash
# Fix npm cache permissions
sudo chown -R $(whoami) ~/.npm

# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Manual installation with npx
```bash
# Install dependencies with yarn (alternative)
yarn install

# Or use npx directly
npx vite --host 0.0.0.0 --port 5173
```

### Option 3: Docker setup (if available)
```bash
# Create Dockerfile
cat > Dockerfile <<EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
EOF

# Build and run
docker build -t ielts-dev .
docker run -p 5173:5173 ielts-dev
```

## Current Project Status

✅ **Ready to run:**
- React + TypeScript setup
- Tailwind CSS configured
- E2E tests with Playwright configured
- Project structure complete

⚠️ **Dependencies needed:**
- `npm install` required
- `npx playwright install` for E2E tests

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev          # http://localhost:5173
npm run build        # Production build
npm run lint         # Code linting
npm run preview      # Preview production build

# Testing
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Interactive E2E testing
```

## Accessing the App

Once running, access at: `http://localhost:5173`

## Troubleshooting

If you continue to have permission issues:
1. Use a different package manager: `yarn install` or `pnpm install`
2. Use a temporary directory: `npm install --prefix /tmp/ielts`
3. Use Docker for isolated development environment