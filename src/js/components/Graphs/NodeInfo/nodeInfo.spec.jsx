
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
import { NodeInfoOption, NodeInfoContainer } from './nodeInfo.styled';

describe('NodeInfo component', () => {
  const reactapp = document.createElement('div');
  document.body.appendChild(reactapp);

  const wrapper = mount(
    <NodeInfo nodeJson={httpObjMock} />,
    { attachTo: reactapp },
  );

  it('Correctly switch between action views.', () => {
    wrapper.find(NodeInfoOption).at(0).simulate('click');
    expect(wrapper.find(NodeInfoOption).at(0).text()).toEqual('EXECUTION');
    expect(wrapper.find(NodeInfoContainer).at(0).getDOMNode()).toBeVisible();
    wrapper.find(NodeInfoOption).at(1).simulate('click');
    expect(wrapper.find(NodeInfoContainer).at(1).getDOMNode()).toBeVisible();
  });
});
