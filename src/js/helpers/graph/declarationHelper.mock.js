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

// single nodes

export const singleNode = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'single',
  response: {
    transition: '_success',
    invocations: {},
  },
};

export const singleNodeWithTransitions = {
  id: 'A',
  label: 'A label',
  status: 'other',
  type: 'single',
  on: {
    _success: {
      id: 'A A',
      label: 'A A label',
      status: 'unprocessed',
      type: 'single',
    },
    _error: {
      id: 'A B',
      label: 'A B label',
      status: 'unprocessed',
      type: 'single',
    },
    custom1: {
      id: 'A C',
      label: 'A C label',
      status: 'success',
      type: 'single',
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  },
  response: {
    invocations: {},
    transition: 'custom1',
  },
};

// composite nodes

export const compositeWithoutSubtasksField = {
  id: 'A',
  label: 'A label',
  status: 'unprocessed',
  type: 'composite',
};

export const compositeNodeWithNoSubtasks = {
  id: 'A',
  label: 'A label',
  status: 'unprocessed',
  type: 'composite',
  subtasks: [],
};

export const compositeNode = {
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

export const compositeNodeWithTransitions = {
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
        invocations: {},
        transition: 'success',
      },
    },
    {
      id: 'A-B',
      label: 'A-B label',
      status: 'success',
      type: 'single',
      response: {
        invocations: {},
        transition: 'success',
      },
    },
  ],
  response: {
    transition: '_success',
  },
  on: {
    _success: {
      id: 'A A',
      label: 'A A label',
      status: 'success',
      type: 'single',
      response: {
        invocations: {},
        transition: 'success',
      },
    },
  },
};

export const compositeWithMultipleLevelEndNodes = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'error',
      type: 'single',
      response: {
        invocations: {},
        transition: '_error',
      },
    },
    {
      id: 'A-B',
      label: 'A-B label',
      status: 'success',
      type: 'single',
      on: {
        _error: {
          id: 'A-B A',
          label: 'A-B A label',
          status: 'success',
          type: 'single',
          response: {
            invocations: {},
            transition: '_success',
          },
        },
      },
      response: {
        invocations: {},
        transition: '_error',
      },
    },
  ],
  on: {
    _success: {
      id: 'B',
      label: 'B label',
      status: 'error',
      type: 'single',
      response: {
        invocations: {},
        transition: '_error',
      },
    },
  },
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const compositeWithNodeWithAllTransitions = {
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
      on: {
        _success: {
          id: 'A-A-A',
          label: 'A-A-A label',
          status: 'success',
          type: 'single',
          response: {
            invocations: {},
            transition: 'success',
          },
        },
        _error: {
          id: 'A-A-B',
          label: 'A-A-B label',
          status: 'unprocessed',
          type: 'single',
        },
      },
      response: {
        invocations: {},
        transition: 'success',
      },
    },
  ],
  response: {
    transition: '_success',
  },
  on: {
    _success: {
      id: 'A A',
      label: 'A A label',
      status: 'success',
      type: 'single',
      response: {
        invocations: {},
        transition: 'success',
      },
    },
  },
};

export const compositeWithComplexTransitions = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'error',
      type: 'single',
      response: {
        invocations: {},
        transition: '_error',
      },
    },
    {
      id: 'A-B',
      label: 'A-B label',
      status: 'success',
      type: 'single',
      on: {
        _error: {
          id: 'A-B A',
          label: 'A-B A label',
          status: 'success',
          type: 'single',
          response: {
            invocations: {},
            transition: '_success',
          },
        },
      },
      response: {
        invocations: {},
        transition: '_error',
      },
    },
  ],
  on: {
    _success: {
      id: 'B',
      label: 'B label',
      status: 'error',
      type: 'single',
      response: {
        invocations: {},
        transition: '_error',
      },
    },
  },
  response: {
    invocations: {},
    transition: '_success',
  },
};

export const compositeWithUnprocessedNodeInSubtask = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'success',
      type: 'single',
      on: {
        _success: {
          id: 'A-A A',
          label: 'A-A A label',
          status: 'error',
          type: 'single',
          response: {
            invocations: {},
            transition: '_error',
          },
        },
        _error: {
          id: 'A-A B',
          label: 'A-A B label',
          status: 'unprocessed',
          type: 'single',
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
    transition: '_error',
  },
};

export const compositeWithMissingNodeInSubtask = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'other',
      type: 'single',
      on: {
        custom: {
          id: 'A-A A',
          label: 'A-A A label',
          status: 'missing',
          type: 'single',
        },
      },
      response: {
        invocations: {},
        transition: 'custom',
      },
    },
  ],
  response: {
    invocations: {},
    transition: '_error',
  },
};

export const compositeWithUnevenSubtasks = {
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
      on: {
        _success: {
          id: 'A-A A',
          label: 'A-A A label',
          status: 'success',
          type: 'single',
          on: {
            _success: {
              id: 'A-A A A',
              label: 'A-A A A label',
              status: 'success',
              type: 'single',
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
        _fallback: {
          id: 'A-A B',
          label: 'A-A B label',
          status: 'unprocessed',
          type: 'single',
        },
      },
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
      response: {
        invocations: {},
        transition: '_success',
      },
    },
  ],
};

export const nestedComposites = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'error',
      type: 'composite',
      subtasks: [
        {
          id: 'A-A-A',
          label: 'A-A-A label',
          status: 'error',
          type: 'single',
          response: {
            invocations: {},
            transition: '_error',
          },
        },
      ],
      response: {
        invocations: {},
        transition: '_error',
      },
    },
  ],
  response: {
    invocations: {},
    transition: '_error',
  },
};
