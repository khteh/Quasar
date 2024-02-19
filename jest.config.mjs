import { quasarEsModulesPackageNames } from '@quasar/quasar-app-extension-testing-unit-jest/jest-preset.mjs';

/** @type {import('jest').Config} */
export default {
  preset: '@quasar/quasar-app-extension-testing-unit-jest',
  clearMocks: true,
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.jsx',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/test/jest/coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  // coverageThreshold: {
  //   global: {
  //      branches: 50,
  //      functions: 50,
  //      lines: 50,
  //      statements: 50
  //   },
  // },
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'ts'],
  moduleNameMapper: {
    '^quasar$': 'quasar/dist/quasar.esm.prod.js',
    '^~/(.*)$': '<rootDir>/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^boot/(.*)$': '<rootDir>/src/boot/$1',
    '.*css$': '@quasar/quasar-app-extension-testing-unit-jest/stub.css',
  },
  testMatch: [
    '<rootDir>/test/jest/__tests__/**/*.(spec|test).[jt]s?(x)',
    '<rootDir>/src/**/*.(spec|test).[tj]s?(x)',
  ],
  // coverageThreshold: {
  //   global: {
  //      branches: 50,
  //      functions: 50,
  //      lines: 50,
  //      statements: 50
  //   },
  // },
  transform: {
    [`^(${quasarEsModulesPackageNames}).+\\.js$`]: 'babel-jest',
    '^.+\\.(ts|js|html)$': [
      'ts-jest',
      {
        // Remove if using `const enums`
        // See https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules/
        isolatedModules: true,
      },
    ],
  },
};
