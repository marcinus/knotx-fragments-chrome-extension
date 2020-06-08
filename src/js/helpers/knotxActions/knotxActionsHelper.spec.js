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
import { ICONS } from '../constants';
import { http } from './http';

const mock = (factory, actionFactory) => ({
  operation: {
    data: {
      actionFactory,
      actionConfig: {
        httpMethod: 'get',
      },
    },
    factory,
  },
});

describe('Graph component', () => {
  it('action detect function should choose and return http action obj', () => {
    expect(detectActionType(mock('action', 'http'))).toEqual({
      icon: ICONS.GET,
      templates: [
        {
          name: 'execution',
          template: expect.any(Function),
          default: true,
        },
        {
          name: 'options',
          template: expect.any(Function),
          default: false,
        },
      ],
      defaultTemplate: 'execution',
    });
  });

  it('action detect function should return default value for unrecognized action', () => {
    expect(detectActionType(mock('action', 'custom'))).toEqual({
      icon: '',
      templates: [],
      defaultTemplate: 'raw',
    });
  });

  it('action detect function should return default value for node which has any action ', () => {
    expect(detectActionType({})).toEqual({
      icon: '',
      templates: [],
      defaultTemplate: 'raw',
    });
  });
  it('action detect function should write  an error in console, if find more then one matching action', () => {
    const action1 = http;
    const action2 = http;
    const actions = [action1, action2];

    const error = jest.spyOn(global.console, 'error');

    const result = detectActionType(mock('action', 'http'), actions);

    expect(error).toHaveBeenCalledWith(
      'Node action recognize error. Probably node match to two or more action conditions',
    );

    expect(result).toEqual({
      icon: ICONS.GET,
      templates: [
        {
          name: 'execution',
          template: expect.any(Function),
          default: true,
        },
        {
          name: 'options',
          template: expect.any(Function),
          default: false,
        },
      ],
      defaultTemplate: 'execution',
    });
  });
});
