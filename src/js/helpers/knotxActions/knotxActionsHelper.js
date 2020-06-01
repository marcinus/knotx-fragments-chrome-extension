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
import { inlinePayload } from './inlinePayload';
import { defaultAction } from './defaulAction';

const definedActions = [
  http,
  cache,
  inlinePayload,
];

export const detectActionType = (obj, actions = definedActions) => {
  if (!obj || !obj.operation) return defaultAction();

  const detectedActions = actions
    .map((action) => action(obj))
    .filter((item) => item !== false);

  if (detectedActions && detectedActions.length > 1) {
    console.error('Node action recognize error. Probably node match to two or more action conditions');
  }


  return detectedActions.length
    ? detectedActions[0]
    : defaultAction();
};
