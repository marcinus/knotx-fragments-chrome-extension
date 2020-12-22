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

export function jsonStrategy() {
  const knotxData = document.querySelector('pre').innerHTML;
  const knotxDataJson = JSON.parse(knotxData);

  return Array.isArray(knotxDataJson)
    // eslint-disable-next-line no-underscore-dangle
    ? knotxDataJson.map((item) => ({ debug: item._knotx_fragment, nodes: [] }))
    // eslint-disable-next-line no-underscore-dangle
    : [{ debug: knotxDataJson._knotx_fragment, nodes: [] }];
}

export function htmlStrategy() {
  return Promise.resolve(findFragmentsInContent());
}

export function fallbackStrategy() {
  return htmlStrategy();
}

export function chooseStrategy(contentType) {
  switch (contentType) {
    case 'application/json': return jsonStrategy;
    case 'text/html': return htmlStrategy;
    default: return fallbackStrategy;
  }
}
