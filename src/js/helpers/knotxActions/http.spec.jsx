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

/* eslint-disable react/display-name */

import React from 'react';
import { mount } from 'enzyme';
import { http } from './http';
import { ICONS } from '../constants';
import { httpObjMock } from './http.mock';
import HttpPreview from '../../components/Graphs/NodeInfo/displayOptions/http/HttpExecution';
import Raw from '../../components/Graphs/NodeInfo/displayOptions/raw/Raw';


const mock = (factory, actionFactory, httpMethod, status = 'SUCCES') => ({
  operation: {
    data: {
      actionFactory,
      actionConfig: {
        httpMethod,
      },
    },
    factory,
  },
  status,
});

describe('http action', () => {
  it('Return false if condition not match', () => {
    expect(http(mock('action', 'custom', 'get'))).toEqual(false);
  });
  it('Return correctly object for http action with unrecognized method', () => {
    const httpObj = http(mock('action', 'http', 'custom'));

    expect(httpObj).toEqual({
      icon: ICONS.HTTP,
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

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });
  it('Set get method if httpMethod prop is undefined', () => {
    const httpObj = http(mock('action', 'http', undefined));

    expect(httpObj).toEqual({
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

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });
  it('Return correctly object for http get action', () => {
    const httpObj = http(mock('action', 'http', 'get'));

    expect(httpObj).toEqual({
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

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });
  it('Return correctly object for http post action', () => {
    const httpObj = http(mock('action', 'http', 'post'));

    expect(httpObj).toEqual({
      icon: ICONS.POST,
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

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });
  it('Return correctly object for http put action', () => {
    const httpObj = http(mock('action', 'http', 'put'));
    expect(httpObj).toEqual({
      icon: ICONS.PUT,
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

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });
  it('Return correctly object for http delete action', () => {
    const httpObj = http(mock('action', 'http', 'delete'));
    expect(httpObj).toEqual({
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
      icon: ICONS.DELETE,
    });

    const executionTemplateWrapper = mount(<HttpPreview nodeJson={httpObjMock} />);
    expect(executionTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[1].template(httpObjMock))).toEqual(true);
  });

  it('Return correctly object for unprocessed nodes.', () => {
    const httpObj = http(mock('action', 'http', 'delete', 'UNPROCESSED'));
    expect(httpObj).toEqual({
      templates: [
        {
          name: 'options',
          template: expect.any(Function),
          default: true,
        },
      ],
      icon: ICONS.DELETE,
      defaultTemplate: 'options',
    });

    const optionsTemplateWrapper = mount(<Raw nodeJson={httpObjMock.operation.data.actionConfig} />);
    expect(optionsTemplateWrapper.matchesElement(httpObj.templates[0].template(httpObjMock))).toEqual(true);
  });
});
