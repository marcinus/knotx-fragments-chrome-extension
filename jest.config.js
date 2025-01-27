/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

process.env.TEST_REPORT_PATH = 'build/test';
module.exports = {
  bail: true,
  verbose: true,
  errorOnDeprecated: true,
  preset: "jest-puppeteer",
  testEnvironment: "jsdom",
  testTimeout: 1000,
  testResultsProcessor: './node_modules/jest-junit-reporter',
  collectCoverage: true,
  coverageDirectory: './build/test/coverage',
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/js/helpers/**/*.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    './src/js/state/**/*.js': {
      statements: 100,
    },
    './src/js/components/Graphs/': {
      branches: 50,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['jest-extended', './jest.setup.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};
