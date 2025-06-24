import sharedConfig from './jest.config';

export default {
  ...sharedConfig,
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: ['node_modules'],
  verbose: true,
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['text', 'lcov', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!<rootDir>/src/data/**',
    '!<rootDir>/src/infra/**',
    '!<rootDir>/src/presentation/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/commons/decorators/**',
    '!<rootDir>/src/**/abstract/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/main.ts',
  ],
  reporters: ['default'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
