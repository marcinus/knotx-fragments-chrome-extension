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
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import FragmentGannt from './fragmentGannt';
import data from '../FragmentList/fragmentList.mock';
import reducer from '../../state/reducers/index';
import { Timeline, TimelineBar } from './fragmentGannt.style';

describe('<SidePanel /> unit test', () => {
  const getWrapper = () => mount(
    <Provider store={createStore(reducer, { pageData: data })}>
      <FragmentGannt tabId={777} />
    </Provider>,
  );

  it('Gannt chart chould hide and show correctly', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(Timeline).getDOMNode()).toBeVisible();
    wrapper.find(TimelineBar).first().simulate('click');
    expect(wrapper.find(Timeline).getDOMNode()).not.toBeVisible();
  });
});
