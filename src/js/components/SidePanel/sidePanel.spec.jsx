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
import data from '../FragmentList/fragmentList.mock';
import reducer from '../../state/reducers/index';
import SidePanel from './SidePanel';
import {
  SidePanelWrapper,
  ToogleArrow,
  ToogleBurger,
  CloseSidePanelButton,
} from './sidePanel.style';
import { FragmentListItemContainer } from '../FragmentList/FragmentListItem/fragmentListItem.style';

describe('<SidePanel /> unit test', () => {
  const getWrapper = () => mount(
    <Provider store={createStore(reducer, { pageData: data })}>
      <SidePanel tabId={777} />
    </Provider>,
  );

  it('click on non active fragment should hide sidebar when screen width is less than 700px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });
    const wrapper = getWrapper();
    wrapper.find(FragmentListItemContainer);
    expect(wrapper.find(SidePanelWrapper).prop('expanded')).toEqual(true);
    wrapper.find(FragmentListItemContainer).first().simulate('click');
    expect(wrapper.find(SidePanelWrapper).prop('expanded')).toEqual(false);
    wrapper.find(ToogleArrow).first().simulate('click');
    expect(wrapper.find(SidePanelWrapper).prop('expanded')).toEqual(true);
  });

  it('click on fragment should not hide sidebar when screen width is higher than 700px', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1024,
    });
    const wrapper = getWrapper();
    expect(wrapper.find(SidePanelWrapper).prop('expanded')).toEqual(true);
    wrapper.find(FragmentListItemContainer).first().simulate('click');
    expect(wrapper.find(SidePanelWrapper).prop('expanded')).toEqual(true);
  });

  it('toggle button should open and close sidebar', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(SidePanelWrapper).prop('expanded')).toBe(true);
    wrapper
      .find(CloseSidePanelButton).simulate('click');
    expect(wrapper
      .find(SidePanelWrapper).prop('expanded')).toEqual(false);
    wrapper
      .find(ToogleBurger).simulate('click');
    expect(wrapper
      .find(SidePanelWrapper).prop('expanded')).toEqual(true);
  });
});
