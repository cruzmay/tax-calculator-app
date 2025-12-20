# Tax Calculator

A React application that calculates income tax based on tax brackets. The application fetches tax rates from an API, calculates total taxes owed, displays the breakdown by tax bracket, and shows the effective tax rate.

## Features

- Calculate income tax for different tax years (2019-2022)
- Display total taxes owed
- Show tax breakdown by bracket
- Display effective tax rate
- User authentication with protected routes
- Error handling and validation

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Docker (to run the API server)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the API Server

The application requires a local API server. Run it using Docker:

> You can find the Docker image repository [here](https://github.com/points/interview-test-server).

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

The API will be available at `http://localhost:5001`

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Login Credentials

- **Username:** `every word`
- **Password:** `every password`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

(Press `q` to quit watch mode)

### Run tests with coverage

```bash
npm run test:coverage
```

## Code Formatting

This project uses Prettier for code formatting.

### Format all files

```bash
npm run format
```

### Check formatting without making changes

```bash
npm run format:check
```

## Project Structure

```
src/
├── components/     # React components
├── contexts/        # React contexts (Auth)
├── helpers/         # Utility functions (calculations, formatters, error handling)
├── hooks/           # Custom React hooks
├── interfaces/      # TypeScript interfaces
├── pages/           # Page components
└── services/        # API services
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Jest** - Testing framework
- **React Router** - Routing
- **Axios** - HTTP client
- **Prettier** - Code formatter
- **ESLint** - Code linting
