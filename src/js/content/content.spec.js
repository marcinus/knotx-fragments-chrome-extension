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

import { getData } from './content';
import * as nodesHelper from '../helpers/nodes/nodesHelper';

function setupFetchMock(result) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(result),
    })
  );
}

function setupHtmlMock(result) {
  nodesHelper.findFragmentsInContent = jest.fn(() => result);
}

beforeEach(() => {
  global.chrome = { runtime: { sendMessage: jest.fn() } };
});

it('getData passes no fragments for unsupported response type', async () => {
  await getData('text/plain');

  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({fragmentsData: []}, expect.any(Function));
});

it('getData passes one fragment with no nodes for JSON object in response', async () => {
  const mockedResponse = { _knotx_fragment: { id: '0' }, some_data: 42 };
  setupFetchMock(mockedResponse)

  await getData('application/json');

  const expectedMessage = {
    fragmentsData: [
      {
        debug: mockedResponse._knotx_fragment,
        nodes: [],
      },
    ],
  };

  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedMessage, expect.any(Function));
});

it('getData passes no fragments for empty JSON array in response', async () => {
  const mockedResponse = [];
  setupFetchMock(mockedResponse)

  await getData('application/json');

  const expectedMessage = { fragmentsData: [] };

  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedMessage, expect.any(Function));
});

it('getData passes multiple fragments with no nodes for JSON array in response', async () => {
  const mockedResponse = [
    { _knotx_fragment: { id: '0' }, some_data: 42 },
    { _knotx_fragment: { id: '1' }, some_other_data: 'lorem' },
  ];
  setupFetchMock(mockedResponse)

  await getData('application/json');

  const expectedMessage = {
    fragmentsData: [
      {
        debug: mockedResponse[0]._knotx_fragment,
        nodes: [],
      },
      {
        debug: mockedResponse[1]._knotx_fragment,
        nodes: [],
      }
    ],
  };

  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedMessage, expect.any(Function));
});

it('getData delegates processing to nodeHelper for HTML response', async () => {
  const nodesHelperOutput = [{ id: '0' }, { id: '1'}];
  setupHtmlMock(nodesHelperOutput)

  await getData('text/html');

  const expectedMessage = {
    fragmentsData: nodesHelperOutput,
  };

  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedMessage, expect.any(Function));
});
