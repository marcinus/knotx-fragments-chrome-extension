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

import { getProcessedNodes } from './declarationHelper';

test('One-node-graph is returned with uniqueLabel', () => {
  const rootNode = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'single',
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expected = {
    ...rootNode,
    uniqueLabel: 'A label',
  };

  expect(getProcessedNodes(rootNode)).toStrictEqual([expected]);
});

test('Multiple transition are parsed correctly', () => {
  const grandChild = {
    id: 'AAA',
    label: 'AAA label',
    status: 'success',
    type: 'single',
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const child = {
    id: 'AA',
    label: 'AA label',
    status: 'success',
    type: 'single',
    on: {
      _success: grandChild,
    },
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const graph = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'single',
    on: {
      _success: child,
    },
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expectedGrandChild = {
    ...grandChild,
    uniqueLabel: 'AAA label',
  };

  const expectedChild = {
    ...child,
    uniqueLabel: 'AA label',
    on: {
      _success: expectedGrandChild,
    },
  };

  const expectedGraph = {
    ...graph,
    uniqueLabel: 'A label',
    on: {
      _success: expectedChild,
    },
  };

  expect(getProcessedNodes(graph)).toStrictEqual([expectedGraph, expectedChild, expectedGrandChild]);
});

test('Processed child nodes are returned', () => {
  const child = {
    id: 'AA',
    label: 'AA label',
    status: 'success',
    type: 'single',
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const graph = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'single',
    on: {
      _success: child,
    },
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expectedChild = {
    ...child,
    uniqueLabel: 'AA label',
  };

  const expectedGraph = {
    ...graph,
    uniqueLabel: 'A label',
    on: {
      _success: expectedChild,
    },
  };

  expect(getProcessedNodes(graph)).toStrictEqual([expectedGraph, expectedChild]);
});

test('Unprocessed child nodes are not returned', () => {
  const child = {
    id: 'AA',
    label: 'AA label',
    status: 'unprocessed',
    type: 'single',
  };

  const graph = {
    id: 'A',
    label: 'A label',
    status: 'error',
    type: 'single',
    on: {
      _success: child,
    },
    response: {
      invocations: [],
      transition: '_error',
    },
  };

  const expectedChild = {
    ...child,
    uniqueLabel: 'AA label',
  };

  const expectedGraph = {
    ...graph,
    uniqueLabel: 'A label',
    on: {
      _success: expectedChild,
    },
  };

  expect(getProcessedNodes(graph)).toStrictEqual([expectedGraph]);
});

test('Missing nodes are not returned', () => {
  const child = {
    id: 'AA',
    label: '!',
    status: 'missing',
    type: 'single',
  };

  const graph = {
    id: 'A',
    label: 'A label',
    status: 'error',
    type: 'single',
    on: {
      _error: child,
    },
    response: {
      invocations: [],
      transition: '_error',
    },
  };

  const expectedChild = {
    ...child,
    uniqueLabel: '!',
  };

  const expectedGraph = {
    ...graph,
    uniqueLabel: 'A label',
    on: {
      _error: expectedChild,
    },
  };

  expect(getProcessedNodes(graph)).toStrictEqual([expectedGraph]);
});

test('Top level composites are treated as a whole', () => {
  const compositeRoot = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'composite',
    subtasks: [
      {
        id: 'A-A',
        label: 'A-A label',
        status: 'success',
        type: 'single',
        response: {
          invocations: [],
          transition: '_success',
        },
      },
    ],
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expectedCompositeRoot = {
    ...compositeRoot,
    uniqueLabel: 'A label',
  };

  expectedCompositeRoot.subtasks[0].uniqueLabel = 'A-A label';

  expect(getProcessedNodes(compositeRoot)).toStrictEqual([expectedCompositeRoot]);
});

test('Below top level composites are treated as a whole', () => {
  const compositeChild = {
    id: 'AB',
    label: 'AB label',
    status: 'success',
    type: 'composite',
    subtasks: [
      {
        id: 'AB-A',
        label: 'AB-A label',
        status: 'success',
        type: 'single',
        response: {
          invocations: [],
          transition: '_success',
        },
      },
    ],
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const graph = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'single',
    on: {
      _success: compositeChild,
    },
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expectedCompositeChild = {
    ...compositeChild,
    uniqueLabel: 'AB label',
  };

  expectedCompositeChild.subtasks[0].uniqueLabel = 'AB-A label';

  const expectedGraph = {
    ...graph,
    uniqueLabel: 'A label',
    on: {
      _success: {
        ...expectedCompositeChild,
      },
    },
  };

  expect(getProcessedNodes(graph)).toStrictEqual([expectedGraph, expectedCompositeChild]);
});

test('Transitions from composite nodes are handled correctly', () => {
  const singleChild = {
    id: 'AA',
    label: 'AA label',
    status: 'success',
    type: 'single',
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const compositeRoot = {
    id: 'A',
    label: 'A label',
    status: 'success',
    type: 'composite',
    subtasks: [
      {
        id: 'A-A',
        label: 'A-A label',
        status: 'success',
        type: 'single',
        response: {
          invocations: [],
          transition: '_success',
        },
      },
    ],
    on: {
      _success: singleChild,
    },
    response: {
      invocations: [],
      transition: '_success',
    },
  };

  const expectedChild = {
    ...singleChild,
    uniqueLabel: 'AA label',
  };

  const expectedCompositeRoot = {
    ...compositeRoot,
    uniqueLabel: 'A label',
    on: {
      _success: expectedChild,
    },
  };

  expectedCompositeRoot.subtasks[0].uniqueLabel = 'A-A label';

  expect(getProcessedNodes(compositeRoot)).toStrictEqual([expectedCompositeRoot, expectedChild]);
});
