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
import { ICONS } from '../constants';


const mock = (factory, actionFactory, httpMethod) => ({
  operation: {
    data: {
      actionFactory,
      actionConfig: {
        httpMethod,
      },
    },
    factory,
  },
});

describe('http action', () => {
  it('Return false if condition not match', () => {
    expect(http(mock('action', 'custom', 'get'))).toEqual(false);
  });
  it('Return correctly object for http action with unrecognized method', () => {
    expect(http(mock('action', 'http', 'custom'))).toEqual({
      condition: true,
      icon: ICONS.HTTP,
    });
  });
  it('Set get method if httpMethod prop is undefined', () => {
    expect(http(mock('action', 'http', undefined))).toEqual({
      condition: true,
      icon: ICONS.GET,
    });
  });
  it('Return correctly object for http get action', () => {
    expect(http(mock('action', 'http', 'get'))).toEqual({
      condition: true,
      icon: ICONS.GET,
    });
  });
  it('Return correctly object for http post action', () => {
    expect(http(mock('action', 'http', 'post'))).toEqual({
      condition: true,
      icon: ICONS.POST,
    });
  });
  it('Return correctly object for http put action', () => {
    expect(http(mock('action', 'http', 'put'))).toEqual({
      condition: true,
      icon: ICONS.PUT,
    });
  });
  it('Return correctly object for http delete action', () => {
    expect(http(mock('action', 'http', 'delete'))).toEqual({
      condition: true,
      icon: ICONS.DELETE,
    });
  });
});
