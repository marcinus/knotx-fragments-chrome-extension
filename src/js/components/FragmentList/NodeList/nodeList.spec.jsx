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
import { shallow } from 'enzyme';
import NodeList from './nodeList';
import { nodes } from './nodeList.mock';
import { NodeButton } from './nodeList.style';


describe('<NodeList /> unit test', () => {
  const getWrapper = () => shallow(
    <NodeList expanded={false}>
      {nodes}
    </NodeList>,
  );

  it('Renders exact amount of nodes as provided', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(NodeButton).length).toEqual(7);
  });

  it('All node buttons have proper tag names', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(NodeButton).first().prop('children')).toBe('DIV');
    expect(wrapper.find(NodeButton).at(1).prop('children')).toBe('A');
  });
});
