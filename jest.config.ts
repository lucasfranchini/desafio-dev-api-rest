export default {
  testEnvironment: 'node',
  rootDir: './',
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@application/(.*)$': ['src/application/$1'],
    '^@domain/(.*)$': ['src/domain/$1'],
    '^@infra/(.*)$': ['src/infra/$1'],
    '^@presentation/(.*)$': ['src/presentation/$1'],
  },
  testPathIgnorePatterns: [
    '/node_modules./',
    '<rootDir>/(coverage|dist|lib|tmp)./',
  ],
};
