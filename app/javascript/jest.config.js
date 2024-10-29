module.exports = {
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  roots: ['./__tests__'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jestSetup.js'],
  verbose: true
};