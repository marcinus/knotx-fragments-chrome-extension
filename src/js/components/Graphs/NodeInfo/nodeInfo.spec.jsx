
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
import NodeInfo from './NodeInfo';
import { httpObjMock } from '../../../helpers/knotxActions/http.mock';
import { NodeInfoOption } from './nodeInfo.styled';

describe('NodeInfo component', () => {
  const reactapp = document.createElement('div');
  document.body.appendChild(reactapp);

  const wrapper = mount(
    <NodeInfo nodeJson={httpObjMock} />,
    { attachTo: reactapp },
  );

  it('Correctly switch between action views.', () => {
    expect(wrapper.find('#raw-container').at(0).getDOMNode()).toBeVisible();
    expect(wrapper.find(NodeInfoOption).at(1).text()).toEqual('PREVIEW');
    wrapper.find(NodeInfoOption).at(1).simulate('click');
    expect(wrapper.find(NodeInfoOption).at(1).prop('active')).toEqual(true);

    expect(wrapper.find('#raw-container').at(0).getDOMNode()).not.toBeVisible();
    expect(wrapper.find('#preview-container').at(0).getDOMNode()).toBeVisible();

    expect(wrapper.find(NodeInfoOption).at(2).text()).toEqual('PAYLOAD');
    wrapper.find(NodeInfoOption).at(2).simulate('click');
    expect(wrapper.find(NodeInfoOption).at(2).prop('active')).toEqual(true);

    expect(wrapper.find('#preview-container').at(0).getDOMNode()).not.toBeVisible();
    expect(wrapper.find('#payload-container').at(0).getDOMNode()).toBeVisible();

    expect(wrapper.find(NodeInfoOption).at(3).text()).toEqual('BODY');
    wrapper.find(NodeInfoOption).at(3).simulate('click');
    expect(wrapper.find(NodeInfoOption).at(3).prop('active')).toEqual(true);

    expect(wrapper.find('#payload-container').at(0).getDOMNode()).not.toBeVisible();
    expect(wrapper.find('#body-container').at(0).getDOMNode()).toBeVisible();

    expect(wrapper.find(NodeInfoOption).at(0).text()).toEqual('RAW');
    wrapper.find(NodeInfoOption).at(0).simulate('click');
    expect(wrapper.find(NodeInfoOption).at(0).prop('active')).toEqual(true);

    expect(wrapper.find('#body-container').at(0).getDOMNode()).not.toBeVisible();
    expect(wrapper.find('#raw-container').at(0).getDOMNode()).toBeVisible();
  });
});
