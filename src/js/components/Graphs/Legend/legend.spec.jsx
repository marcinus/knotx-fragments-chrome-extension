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
import Legend from './Legend';
import LegendSection from './LegendSection';
import { legendArrays } from './legendHelper';
import reducer from '../../../state/reducers/index';
import {
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
} from './legend.style';

const store = {
  pageData: {
    1: {},
  },
};

describe('Legend section component', () => {
  const wrapper = mount(
    <Provider store={createStore(reducer, store)}>
      <Legend tabId={1} />
    </Provider>,
  );
  const legendSections = wrapper.find(LegendSection);

  it('Legend comonent is visible and has correctly number of sections', () => {
    expect(wrapper.getDOMNode()).toBeVisible();
    expect(legendSections).toHaveLength(4);
  });

  it('Sections have correctly number of items, consistent with legendArrays', () => {
    expect(legendSections.at(0).find(LegendItem)).toHaveLength(legendArrays.nodes.length);
    expect(legendSections.at(1).find(LegendItem)).toHaveLength(legendArrays.composites.length);
    expect(legendSections.at(2).find(LegendItem)).toHaveLength(legendArrays.labels.length);
    expect(legendSections.at(3).find(LegendItem)).toHaveLength(legendArrays.edges.length);
  });

  it('Every items in section should have correctly icon', () => {
    expect(legendSections.at(0).find(SquareIcon)).toHaveLength(legendArrays.nodes.length);
    expect(legendSections.at(1).find(CircleIcon)).toHaveLength(legendArrays.composites.length);
    expect(legendSections.at(2).find(RectangleIcon)).toHaveLength(legendArrays.labels.length);
    expect(legendSections.at(3).find(LineIcon)).toHaveLength(legendArrays.edges.length);
  });

  it('Every items in section should have description', () => {
    // expect(legendSections.at(0).find(LegendItemDescription)).toHaveLength(legendArrays.nodes.length);
    legendSections.at(0).find(LegendItemDescription).forEach((node) => {
      expect(node.text()).not.toEqual('');
    });
    legendSections.at(1).find(LegendItemDescription).forEach((node) => {
      expect(node.text()).not.toEqual('');
    });
    legendSections.at(2).find(LegendItemDescription).forEach((node) => {
      expect(node.text()).not.toEqual('');
    });
    legendSections.at(3).find(LegendItemDescription).forEach((node) => {
      expect(node.text()).not.toEqual('');
    });
  });
});
