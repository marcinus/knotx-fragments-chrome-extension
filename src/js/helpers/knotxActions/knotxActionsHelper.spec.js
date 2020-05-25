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

import { detectActionType } from './knotxActionsHelper';

const mock = (factory, actionFactory) => ({
  operation: {
    data: {
      actionFactory,
    },
    factory,
  },
});

describe('Graph component', () => {
  it('action detect function should return http action obj', () => {
    expect(detectActionType(mock('action', 'http'))).toEqual({
      condition: true,
      icon: '',
    });
  });

  it('action detect function should return default value for unrecognized action', () => {
    expect(detectActionType(mock('action', 'custom'))).toEqual({
      icon: '',
    });
  });
});
