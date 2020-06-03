
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

import React from 'react';
import { mount } from 'enzyme';
import { inlinePayload } from './inlinePayload';
import { ICONS } from '../constants';
import Raw from '../../components/Graphs/NodeInfo/displayOptions/raw/Raw';
import { inlinePayloadObjMock } from './inlinePayload.mock';

const mock = (factory, actionFactory, status = 'SUCCES') => ({
  operation: {
    data: {
      actionFactory,
    },
    factory,
  },
  status,
});

describe('inline-payload action', () => {
  it('Return false if condition not match', () => {
    expect(inlinePayload(mock('action', 'custom'))).toEqual(false);
  });

  it('Return correctly object if node is unprocessed', () => {
    const inlinePayloadObj = inlinePayload(mock('action', 'inline-payload', 'UNPROCESSED'));
    expect(inlinePayloadObj).toEqual({
      previewTemplate: expect.any(Function),
      bodyTemplate: expect.any(Function),
      icon: ICONS.PAYLOAD,
    });

    const previewTemplateWrapper = '';
    expect(inlinePayloadObj.previewTemplate(inlinePayloadObjMock)).toEqual(previewTemplateWrapper);

    const bodyTemplateWrapper = '';
    expect(inlinePayloadObj.bodyTemplate(inlinePayloadObjMock)).toEqual(bodyTemplateWrapper);
  });

  it('Return correctly object for payload action', () => {
    const inlinePayloadObj = inlinePayload(mock('action', 'inline-payload'));
    expect(inlinePayloadObj).toEqual({
      previewTemplate: expect.any(Function),
      bodyTemplate: expect.any(Function),
      icon: ICONS.PAYLOAD,
    });

    const previewTemplateWrapper = mount(<Raw nodeJson={inlinePayloadObjMock.response.invocations[0].logs.value} />);
    expect(previewTemplateWrapper.matchesElement(inlinePayloadObj.previewTemplate(inlinePayloadObjMock))).toEqual(true);

    const bodyTemplateWrapper = '';
    expect(inlinePayloadObj.bodyTemplate(inlinePayloadObjMock)).toEqual(bodyTemplateWrapper);
  });
});
