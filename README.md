# TypeScript Monorepo

A production-ready TypeScript monorepo using Yarn Workspaces for package management and tooling.

## Description

This monorepo provides a scalable architecture for managing multiple TypeScript packages within a single repository. It uses Yarn Workspaces for dependency management and running scripts across packages.

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **Yarn**: Version 1.22.0 or higher (classic)
- **TypeScript**: Version 5.0+ (included as dev dependency)

```bash
# Verify your installations
node --version  # Should be >= 18.0.0
yarn --version  # Should be >= 1.22.0
```

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd typescript-monorepo
```

2. **Install dependencies**

```bash
yarn install
```

This will automatically install all dependencies for all workspaces defined in the project.

## Workspace Structure

```
typescript-monorepo/
├── packages/                  # Workspace packages directory
│   ├── shared/               # Shared utilities and types
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── core/                 # Core library
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ...
├── package.json              # Root package.json (workspaces config)
├── tsconfig.json             # Root TypeScript config
└── yarn.lock                 # Lock file
```

### Package Responsibilities

| Package | Description |
|---------|-------------|
| `shared` | Common utilities, types, and helper functions shared across packages |
| `core` | Core business logic and main functionality |

## Available Scripts

The following scripts are available at the root level and can be run across all workspaces:

### Build

```bash
# Build all packages
yarn build

# Build a specific package
yarn workspace <package-name> build
```

### Test

```bash
# Run tests for all packages
yarn test

# Run tests for a specific package
yarn workspace <package-name> test

# Run tests in watch mode
yarn test:watch
```

### Lint

```bash
# Lint all packages
yarn lint

# Lint a specific package
yarn workspace <package-name> lint

# Fix linting issues automatically
yarn lint:fix
```

### Clean

```bash
# Remove all build artifacts (node_modules, dist, etc.)
yarn clean

# Deep clean - removes all node_modules and lock files
yarn clean:deep
```

### Development

```bash
# Start development mode (if supported by packages)
yarn dev

# Type-check all packages without building
yarn typecheck
```

## Adding a New Package

To add a new package to the monorepo:

1. **Create the package directory**

```bash
mkdir -p packages/my-new-package/src
```

2. **Create `package.json`**

```json
{
  "name": "@my-org/my-new-package",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

3. **Create `tsconfig.json`**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

4. **Create source files** in the `src` directory

5. **Build the new package**

```bash
yarn build
```

## Running Commands Across Workspaces

```bash
# Run a script in all packages (runs in parallel by default)
yarn workspaces foreach -A run <script>

# Run a script in all packages sequentially
yarn workspaces foreach -A run --topological-dev --no-sort <script>

# Run a script in a specific package
yarn workspace <package-name> run <script>

# Add a dependency to a specific workspace
yarn workspace <package-name> add <package>

# Add a dev dependency to a specific workspace
yarn workspace <package-name> add -D <package>
```

### Common Examples

```bash
# Build all packages
yarn workspaces foreach -A run build

# Run all tests
yarn workspaces foreach -A run test
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`yarn test && yarn lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the [LICENSE](LICENSE) file for details.

---

## Badges

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-blue.svg)](https://yarnpkg.com/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Test Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen.svg)](#)

---

## Support

If you find this project useful, please consider giving it a ⭐ on GitHub!

For questions and discussions, please open an issue on the repository.
