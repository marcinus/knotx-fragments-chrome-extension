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
import data from './fragmentList.mock';
import reducer from '../../state/reducers/index';
import FragmentList, { mapDataToComponents } from './fragmentList';
import FragmentListItem from './FragmentListItem/fragmentListItem';
import { TableItemId } from './FragmentListItem/fragmentListItem.style';
import NodeList from './NodeList/nodeList';
import { SortingButton, StatusSortingButton } from './fragmentList.style';
import { NodeButton } from './NodeList/nodeList.style';


describe('<FragmentList /> unit test', () => {
  const getWrapper = () => mount(
    <Provider store={createStore(reducer, { pageData: data })}>
      <FragmentList tabId={777} />
    </Provider>,
  );

  it('should render exactly 5 fragments', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(FragmentListItem))
      .toHaveLength(5);
  });

  it('should render 1 fragment with status success', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'success',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status error', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'error',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status missing', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'missing',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status unprocessed', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'unprocessed',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status other', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'other',
      ))
      .toHaveLength(1);
  });

  it('should render duration', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('time') === 5,
      ))
      .toHaveLength(1);
  });

  it('should render node list under each fragment', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(FragmentListItem)
      .contains(NodeList)).toEqual(true);
  });

  it('nodelist should be displayed after first click on expand node list button', () => {
    const wrapper = getWrapper();
    wrapper
      .find(TableItemId)
      .find('.tableItemIcon')
      .first()
      .simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeList)
      .prop('expanded')).toEqual(true);
  });

  it('nodelist should not be displayed after second click', () => {
    const wrapper = getWrapper();
    wrapper
      .find(TableItemId)
      .find('.tableItemIcon')
      .first()
      .simulate('click')
      .simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeList)
      .prop('expanded')).toEqual(false);
  });

  it('first fragment should render exactly 2 nodes in nodelist', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeButton)).toHaveLength(2);
  });

  it('mapDataToComponents should create proper React objects', () => {
    const generatedComponents = mapDataToComponents(data[777].fragments, 777);
    expect(generatedComponents).toHaveLength(5);
    generatedComponents.forEach((element) => {
      expect(element).toHaveProperty('props');
      expect(element.props).toHaveProperty('id');
      expect(element.props).toHaveProperty('type');
      expect(element.props).toHaveProperty('status');
    });
  });

  it('sorting by status works', () => {
    const wrapper = getWrapper();
    const sortingButton = wrapper.find(StatusSortingButton).at(0);

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('status')).toEqual('error');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('status')).toEqual('success');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('status')).toEqual('error');
  });

  it('sorting by type works', () => {
    const wrapper = getWrapper();
    const sortingButton = wrapper.find(SortingButton).at(1);

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('type')).toEqual('E');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('type')).toEqual('A');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('type')).toEqual('E');
  });

  it('sorting by id works', () => {
    const wrapper = getWrapper();
    const sortingButton = wrapper.find(SortingButton).at(0);
    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('id')).toEqual('E');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('id')).toEqual('A');

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('id')).toEqual('E');
  });

  it('sorting by time works', () => {
    const wrapper = getWrapper();
    const sortingButton = wrapper.find(SortingButton).at(2);

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('time')).toEqual(5);

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('time')).toEqual(1);

    sortingButton.simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .prop('time')).toEqual(5);
  });
});
