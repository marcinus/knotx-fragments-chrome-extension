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

import chrome from 'sinon-chrome/extensions';
import { getData } from './content';

describe('content script ', () => {
  beforeAll(() => {
    global.chrome = chrome;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));
  });

  it('getData should send message, and shouldn not fetch any datas for html data source', async () => {
    await getData('text/html');
    expect(chrome.runtime.sendMessage.calledOnce).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(0);
    chrome.flush();
  });

  it('getData should send message, and fetch data for json data source', async () => {
    await getData('application/json');
    expect(chrome.runtime.sendMessage.calledOnce).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(window.location.href);
    chrome.flush();
  });
});
