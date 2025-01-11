# FlowrSpot

FlowrSpot is a web application built with React, TypeScript, and Vite. It allows users to discover and explore flowers around them, view sightings, and manage their profiles.

## Features

- Discover flowers around you
- View latest sightings
- User authentication (login, signup)
- Profile management
- Responsive design

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Router
- Formik
- Yup
- Tailwind CSS
- Axios
- Jest (for testing)
- ESLint (for linting)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/flowrspot.git
cd flowrspot
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

This will start the Vite development server and you can view the application at `http://localhost:3000`.

### Building for Production

To build the project for production, run:

```sh
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

### Running Tests

To run the tests, use:

```sh
npm test
# or
yarn test
```

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
