/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(react-bootstrap-tagsinput)/)']
};

module.exports = config;