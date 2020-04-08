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

import { isJson, postProcessNode } from './nodePostProcessor';
import * as mock from './nodePostProcessor.mock';

test('Json recognition is valid', () => {
  const validJsons = [
    '{}',
    '[]',
    '{ "prop": 12, "anotherProp": [0, 1, { "x": "test" }] }',
  ];

  const invalidJsons = [
    undefined,
    null,
    '',
    '{]',
    'Test',
  ];

  expect(validJsons.every(isJson)).toBeTrue();
  expect(invalidJsons.every((element) => !isJson(element))).toBeTrue();
});

test('Nodes without json response body are left as is', () => {
  expect(postProcessNode(mock.nodeWithNonJsonResponseBody)).toStrictEqual(mock.nodeWithNonJsonResponseBody);
  expect(postProcessNode(mock.nodeWithoutResponseBody)).toStrictEqual(mock.nodeWithoutResponseBody);
});

test('Post processing parses node\'s response body if it\'s a json', () => {
  const processed = postProcessNode(mock.nodeWithJsonResponseBody);

  const expected = {
    ...processed,
    response: {
      transition: '_success',
      invocations: [
        {
          logs: {
            responseBody: {
              prop: 'value',
            },
          },
        },
      ],
    },
  };

  expect(processed).toStrictEqual(expected);
});
