process.env.TEST_REPORT_PATH = "build/test";
module.exports = {
  bail: true,
  verbose: true,
  errorOnDeprecated: true,
  testTimeout: 1000,
  testResultsProcessor: "./node_modules/jest-junit-reporter",
  collectCoverage: true,
  coverageDirectory: "./build/test/coverage",
  coverageReporters: ["json", "html"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    "./src/js/helpers/**/*.js": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    "./src/js/state/**/*.js": {
      statements: 100
    },
    "./src/js/components/": {
      branches: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ["jest-extended"]
};