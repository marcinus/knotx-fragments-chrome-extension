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
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import FragmentListItem from './FragmentListItem';
import {
  Status,
  TableItem,
  TableNameItem,
  NarrowTableItem,
} from './fragmentListItem.style';
import reducer from '../../../state/reducers/index';
import { NodeButton } from '../NodeList/nodeList.style';

describe('<NodeList /> unit test', () => {
  const getWrapper = () => mount(
    <Provider store={createStore(reducer, { pageData: { 1: {} } })}>
      <FragmentListItem
        key={1}
        number={1}
        name="name"
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

  it('Should have proper number', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(NarrowTableItem).at(1).text()).toBe('1');
  });

  it('Should have proper name', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(TableNameItem).at(0).text()).toBe('name');
  });

  it('Should have proper type', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(TableItem).at(0).text()).toBe('snippet');
  });

  it('Should have proper number of nodes', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(NodeButton).length).toEqual(0);
  });
});
