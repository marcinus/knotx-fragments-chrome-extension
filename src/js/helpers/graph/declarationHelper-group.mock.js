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

export const successNode = {
  id: 'A',
  label: 'A label',
  status: 'success',
  type: 'single',
  response: {
    invocations: [],
    transition: '_success',
  },
};

export const errorNode = {
  id: 'A',
  label: 'A label',
  status: 'error',
  type: 'single',
  response: {
    invocations: [],
    transition: '_error',
  },
};

export const missingNode = {
  id: 'A',
  label: 'A label',
  status: 'missing',
  type: 'single',
};

export const unprocessedNode = {
  id: 'A',
  label: 'A label',
  status: 'unprocessed',
  type: 'single',
};

export const otherNode = {
  id: 'A',
  label: 'A label',
  status: 'other',
  type: 'single',
  response: {
    invocations: [],
    transition: 'custom',
  },
};

export const successCompositeNode = {
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

export const errorCompositeNode = {
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
        invocations: [],
        transition: '_error',
      },
    },
  ],
  response: {
    invocations: [],
    transition: '_error',
  },
};

export const unprocessedCompositeNode = {
  id: 'A',
  label: 'A label',
  status: 'unprocessed',
  type: 'composite',
  subtasks: [
    {
      id: 'A-A',
      label: 'A-A label',
      status: 'unprocessed',
      type: 'single',
    },
  ],
};
