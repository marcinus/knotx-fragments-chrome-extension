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
            id: 'E',
            type: 'E',
            time: 5,
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
            id: 'D',
            type: 'D',
            time: 1,
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
            id: 'C',
            type: 'C',
            time: 3,
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
            id: 'B',
            type: 'B',
            time: 2,
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
            id: 'A',
            type: 'A',
            time: 4,
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
