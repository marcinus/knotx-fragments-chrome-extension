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

export default {
  777: {
    fragments: [
      {
        debug: {
          fragment: {
            id: 'E [id]',
            type: 'E [type]',
            time: 5,
            configuration: {
              'data-knotx-task': 'E [name]',
            },
          },
          status: 'FAILURE',
          finishTime: 10,
          startTime: 5,
        },
        nodes: [
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(2)',
            tag: 'DIV',
          },
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(3)',
            tag: 'DIV',
          },
        ],
      },
      {
        debug: {
          fragment: {
            id: 'D [id]',
            type: 'D [type]',
            time: 1,
            configuration: {
              'data-knotx-task': 'D [name]',
            },
          },
          status: 'SUCCESS',
          finishTime: 2,
          startTime: 1,
        },
        nodes: [
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(2)',
            tag: 'DIV',
          },
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(3)',
            tag: 'DIV',
          },
        ],
      },
      {
        debug: {
          fragment: {
            id: 'C [id]',
            type: 'C [type]',
            time: 3,
            configuration: {
              'data-knotx-task': 'C [name]',
            },
          },
          status: 'OTHER',
          finishTime: 4,
          startTime: 1,
        },
        nodes: [
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(2)',
            tag: 'DIV',
          },
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(3)',
            tag: 'DIV',
          },
        ],
      },
      {
        debug: {
          fragment: {
            id: 'B [id]',
            type: 'B [type]',
            time: 2,
            configuration: {
              'data-knotx-task': 'B [name]',
            },
          },
          status: 'UNPROCESSED',
          finishTime: 4,
          startTime: 2,
        },
        nodes: [
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(2)',
            tag: 'DIV',
          },
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(3)',
            tag: 'DIV',
          },
        ],
      },
      {
        debug: {
          fragment: {
            id: 'A [id]',
            type: 'A [type]',
            time: 4,
            configuration: {
              'data-knotx-task': 'A [name]',
            },
          },
          status: 'MISSING',
          finishTime: 8,
          startTime: 4,
        },
        nodes: [
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(2)',
            tag: 'DIV',
          },
          {
            selector: '.container-fluid > :nth-child(2) > :nth-child(3)',
            tag: 'DIV',
          },
        ],
      },
    ],
    url: 'http://localhost:5500/samples/books.html',
    sidebarExpanded: true,
  },
};
