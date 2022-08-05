export default {
  testEnvironment: 'jsdom',
  // Display coverage summary below file-by-file coverage breakdown
  coverageReporters: ['clover', 'json', 'lcov', 'html', 'text', 'text-summary'],
  transform: {
    '\\.js$': ['rollup-jest'],
    '\\.pegjs$': ['pegjs-jest-transformer']
  },
  coveragePathIgnorePatterns: ['\\.pegjs']
};
