module.exports = {
  preset: 'jest-expo',
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  passWithNoTests: true,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^test-utils$': '<rootDir>/test-utils.tsx',
    '@react-native-firebase/messaging':
      '<rootDir>/__mocks__/react-native-firebase-messaging.js',
    '@react-native-firebase/app':
      '<rootDir>/__mocks__/react-native-firebase-app.js',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'stores/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!components/icons/**/*.{ts,tsx}',
    '!components/*.ts',
    '!components/**/*.ts',
    '!services/*.ts',
    '!stores/index.ts',
    '!hooks/index.ts',
    '!utils/index.ts',
  ],
  setupFilesAfterEnv: ['./jest-setup.ts'],
};
