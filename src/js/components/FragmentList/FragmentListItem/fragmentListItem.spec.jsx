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
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import FragmentListItem from './fragmentListItem';
import { Status, Type } from './fragmentListItem.style';
import reducer from '../../../state/reducers/index';
import { NodeButton } from '../NodeList/nodeList.style';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<NodeList /> unit test', () => {
  const getWrapper = () => mount(
    <Provider store={createStore(reducer, { pageData: {} })}>
      <FragmentListItem
        key={1}
        id="1"
        status="success"
        type="snippet"
        nodes={[]}
        tabId={1}
        time={1}
      />
      ,
    </Provider>,
  );

  it('Should have proper status', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(Status).prop('status')).toBe('success');
  });

  it('Should have proper type', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(Type).prop('children')).toBe('snippet');
  });

  it('Should have proper Id', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(FragmentListItem).prop('id')).toBe('1');
  });

  it('Should have proper number of nodes', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(NodeButton).length).toEqual(0);
  });
});
