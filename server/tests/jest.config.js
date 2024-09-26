export default {
  testEnvironment: 'node',
  rootDir: '../', // Point to the project root
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest', // Use Babel to transform JavaScript files
  },
  extensionsToTreatAsEsm: ['.js'], // Treat .js files as ESM
  globals: {
    'ts-jest': {
      useESM: true, // If you're using TypeScript, this option helps
    },
  },
};
