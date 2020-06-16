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

import { findFragmentsInContent } from '../helpers/nodes/nodesHelper';
import { status } from '../helpers/constants';


export const getData = async (contentType) => {
  if (contentType === 'application/json') {
    const url = window.location.href;
    const data = await fetch(url)
      .then((res) => res.json());

    // eslint-disable-next-line no-underscore-dangle
    chrome.runtime.sendMessage({ fragmentsData: [{ debug: data._knotx_fragment, nodes: [] }] }, (response) => {
      if (response.status === status.succes) {
        // eslint-disable-next-line no-console
        console.log(response.msg);
      }
    });
  } else {
    chrome.runtime.sendMessage({ fragmentsData: findFragmentsInContent() }, (response) => {
      if (response.status === status.succes) {
        // eslint-disable-next-line no-console
        console.log(response.msg);
      }
    });
  }
};

window.onload = getData(document.contentType);
