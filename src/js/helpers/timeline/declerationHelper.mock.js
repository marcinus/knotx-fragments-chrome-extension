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

export const singleNode = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'single',
  started: 12345,
  finished: 54321,
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const singleNodeWithTransition = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'single',
  started: 12345,
  finished: 54321,
  on: {
    _success: {
      id: 'AA',
      label: 'AA label',
      status: 'success',
      type: 'single',
      started: 54321,
      finished: 65432,
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  },
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const singleNodeWithMultipleChildrenLevels = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'single',
  started: 12345,
  finished: 54321,
  on: {
    _success: {
      id: 'AA',
      label: 'AA label',
      status: 'success',
      type: 'single',
      started: 54321,
      finished: 65432,
      on: {
        _success: {
          id: 'AAA',
          label: 'AAA label',
          status: 'success',
          type: 'single',
          started: 65432,
          finished: 76543,
          on: {
            _success: {
              id: 'AAAA',
              label: 'AAAA label',
              status: 'success',
              type: 'single',
              started: 76543,
              finished: 87654,
              response: {
                invocations: {},
                transition: '_success',
              },
            },
          },
          response: {
            invocations: {},
            transition: '_success',
          },
        },
      },
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  },
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const compositeNode = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'composite',
  started: 12345,
  finished: 54321,
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'success',
      type: 'single',
      started: 12345,
      finished: 54321,
      response: {
        invocations: {},
        transition: '_success',
      },
    },
    {
      id: 'A-B',
      label: 'A-B label',
      status: 'success',
      type: 'single',
      started: 12345,
      finished: 20000,
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  ],
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const compositeNodeWithSubtaskTransitions = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'composite',
  started: 12345,
  finished: 54321,
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'success',
      type: 'single',
      started: 12345,
      finished: 30000,
      on: {
        _success: {
          id: 'A-AA',
          label: 'A-AA label',
          status: 'success',
          type: 'single',
          started: 30000,
          finished: 54321,
        },
      },
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  ],
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const compositeNodeWithoutSubtasks = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'composite',
  started: 12345,
  finished: 54321,
  subtasks: [],
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const nestedCompositeNodes = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'composite',
  started: 12345,
  finished: 54321,
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'success',
      type: 'composite',
      started: 12345,
      finished: 54321,
      subtasks: [
        {
          id: 'A-A-A',
          label: 'A-A-A label',
          status: 'success',
          type: 'single',
          started: 12345,
          finished: 54321,
          response: {
            invocations: {},
            transition: '_success',
          },
        },
      ],
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  ],
  response: {
    invocations: {},
    transition: '_success',
  },
};
