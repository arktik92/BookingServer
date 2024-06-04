
// Jest configuration
module.exports = {
    setupFiles: ["<rootDir>/jest.setup.js"],
    detectOpenHandles: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    testEnvironment: 'node',
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    testPathIgnorePatterns: ["/node_modules/"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
}