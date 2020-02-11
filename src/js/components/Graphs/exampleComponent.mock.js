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

export const graphJson = {
  id: 'root_id',
  label: 'A',
  on: {
    _error: {
      id: 'root_error_id',
      label: 'C',
      operation: {
        factory: 'payload-to-body',
        type: 'action',
      },
      status: 'unprocessed',
      type: 'single',
    },
    _success: {
      id: 'root_success_id',
      label: 'Invoke all B',
      on: {
        _error: {
          id: 'composite_error_id',
          label: 'F',
          operation: {
            factory: 'te',
            type: 'action',
          },
          response: {
            invocations: [
              {
                alias: 'alias',
                finished: 21342342,
                logs: {},
                operation: 'http',
                started: 123123213,
              },
            ],
            transition: '_success',
          },
          status: 'success',
          transition: '_success',
          type: 'single',
        },
        _success: {
          id: 'composite_success_id',
          label: 'E',
          operation: {
            factory: 'te',
            type: 'action',
          },
          status: 'unprocessed',
          type: 'single',
        },
      },
      response: {
        invocations: [
          {
            alias: 'alias',
            finished: 21342342,
            logs: {},
            operation: 'http',
            started: 123123213,
          },
        ],
        transition: '_error',
      },
      status: 'error',
      subtasks: [
        {
          id: 'subtask_1_id',
          label: 'B1',
          operation: {
            factory: 'http',
            type: 'action',
          },
          response: {
            invocations: [
              {
                alias: 'alias',
                finished: 21342342,
                logs: {},
                operation: 'http',
                started: 123123213,
              },
            ],
            transition: '_success',
          },
          status: 'success',
          type: 'single',
        },
        {
          id: 'subtask_2_id',
          label: 'B2',
          on: {
            _fallback: {
              id: 'subtask_2_fallback_id',
              label: '!',
              status: 'missing',
              type: 'single',
            },
            _success: {
              id: 'subtask_2_success_id',
              label: 'D',
              operation: {
                factory: 'http',
                type: 'action',
              },
              status: 'unprocessed',
              type: 'single',
            },
          },
          operation: {
            factory: 'cb',
            type: 'action',
          },
          response: {
            invocations: [
              {
                alias: 'cb-my-payments',
                finished: 31342342,
                invocations: [
                  {
                    alias: 'my-payments',
                    finished: 23332424,
                    logs: {
                      request: {},
                      response: {
                        statusCode: 500,
                      },
                    },
                    operation: {
                      factory: 'http',
                      type: 'action',
                    },
                    started: 12312312,
                  },
                  {
                    alias: 'my-payments',
                    finished: 23332424,
                    logs: {
                      request: {},
                      response: {
                        statusCode: 500,
                      },
                    },
                    operation: {
                      factory: 'http',
                      type: 'action',
                    },
                    started: 12312312,
                  },
                ],
                logs: {},
                operation: {
                  factory: 'cb',
                  type: 'action',
                },
                started: 123123213,
              },
            ],
            transition: '_fallback',
          },
          status: 'other',
          type: 'single',
        },
      ],
      type: 'composite',
    },
    custom: {
      id: 'root_custom_id',
      label: 'Invoke all G',
      on: {
        _error: {
          id: 'g-error',
          label: 'H',
          status: 'unprocessed',
          type: 'single',
        },
        _success: {
          id: 'g-success',
          label: 'I',
          status: 'unprocessed',
          type: 'single',
        },
      },
      status: 'unprocessed',
      subtasks: [
        {
          id: 'g1',
          label: 'G1',
          status: 'unprocessed',
          type: 'single',
        },
        {
          id: 'g2',
          label: 'G2',
          status: 'unprocessed',
          type: 'single',
        },
        {
          id: 'g3',
          label: 'G3',
          status: 'unprocessed',
          subtasks: [
            {
              id: 'g3-1',
              label: 'G3-1',
              status: 'unprocessed',
              type: 'single',
            },
            {
              id: 'g3-2',
              label: 'G3-2',
              status: 'unprocessed',
              type: 'single',
            },
          ],
          type: 'composite',
        },
      ],
      type: 'composite',
    },
  },
  operation: {
    factory: 'http',
    type: 'action',
  },
  response: {
    invocations: [
      {
        alias: 'alias',
        finished: 21342342,
        logs: {},
        operation: 'http',
        started: 123123213,
      },
    ],
    transition: '_success',
  },
  status: 'success',
  type: 'single',
};
