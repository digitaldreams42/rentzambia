# RentZambia

[![License](https://img.shields.io/github/license/yourusername/rentzambia)](LICENSE)
[![CI](https://github.com/yourusername/rentzambia/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/rentzambia/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/yourusername/rentzambia/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/rentzambia)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/rentzambia)](https://github.com/yourusername/rentzambia/issues)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/rentzambia)](https://github.com/yourusername/rentzambia/stargazers)

A modern property rental platform built with Next.js, TypeScript, and Tailwind CSS.

## 🏠 Overview

RentZambia is a comprehensive property rental platform designed for the Zambian market. It connects tenants with landlords and agents, making property rental simple, fast, and secure.

## ✨ Features

### For Tenants
- 🏘️ Browse and search properties
- ❤️ Save favorite properties
- 📨 Send inquiries to landlords
- 📅 Schedule property visits
- 📋 Book properties online
- 📊 Manage rental history

### For Landlords & Agents
- 📝 List properties for rent
- 🛠️ Manage property listings
- 📩 Handle tenant inquiries
- 📆 Process bookings
- 📈 Track property performance

### For Admins
- 👥 User management and verification
- ✅ Property listing approval
- 📊 Platform analytics and reporting
- ⚙️ Site configuration and settings

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), CSS Modules
- **UI Components**: Custom component library
- **State Management**: React Context API
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), [Cypress](https://www.cypress.io/)
- **Build Tool**: Webpack (via Next.js)
- **Package Manager**: [npm](https://www.npmjs.com/)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (auth)/          # Authentication pages
│   ├── admin/           # Admin dashboard
│   ├── agent/           # Agent dashboard
│   ├── landlord/        # Landlord dashboard
│   ├── property/        # Property details
│   └── tenant/          # Tenant dashboard
├── components/          # Reusable UI components
│   ├── admin/           # Admin-specific components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── landlord/        # Landlord-specific components
│   ├── property/        # Property-related components
│   ├── tenant/          # Tenant-specific components
│   └── ui/              # Generic UI components
├── data/                # Static data and constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── services/            # API service layer
└── types/               # TypeScript interfaces and types
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or later
- [npm](https://www.npmjs.com/) 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rentzambia.git
   cd rentzambia
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues
- `npm run lint:fix` - Runs ESLint and fixes issues
- `npm run type-check` - Runs TypeScript type checking
- `npm test` - Runs unit tests
- `npm run test:watch` - Runs unit tests in watch mode
- `npm run test:coverage` - Runs unit tests with coverage report
- `npm run test:e2e` - Runs end-to-end tests
- `npm run format` - Formats code with Prettier
- `npm run format:check` - Checks code formatting

## 🧪 Testing

RentZambia includes comprehensive testing:

### Unit Testing
```bash
npm test
```

### End-to-End Testing
```bash
npm run test:e2e
```

### Accessibility Testing
```bash
npm run test:a11y
```

## 📖 Documentation

- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Testing Guide](docs/testing.md)
- [Architecture](docs/architecture.md)
- [Component Library](docs/components.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) team for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment
- All contributors who have helped build this project

## 📞 Support

For support, please see our [Support Guide](SUPPORT.md) or [create an issue](https://github.com/yourusername/rentzambia/issues/new/choose).

## 🆕 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this project.

## 🛡️ Security

See [SECURITY.md](SECURITY.md) for our security policy and how to report vulnerabilities.

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for our future development plans.