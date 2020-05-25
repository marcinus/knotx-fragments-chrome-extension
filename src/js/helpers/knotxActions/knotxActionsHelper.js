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

import { http } from './http';
import { cache } from './cache';
import { defaultAction } from './defaulAction';

const actions = [
  http,
  cache,
];

export const detectActionType = (obj) => {
  const detectedActions = actions
    .map((action) => action(obj))
    .filter((item) => item !== false);

  if (detectedActions && detectedActions.length > 1) {
    console.error('Node action recognize error. Probably two or more node match to one condition');
  }


  return detectedActions.length
    ? detectedActions[0]
    : defaultAction();
};
