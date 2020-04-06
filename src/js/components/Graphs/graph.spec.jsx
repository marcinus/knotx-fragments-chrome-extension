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
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GraphComponent from './graph';
import { nodeInfoToIcon } from './graphHelper';
import reducer from '../../state/reducers/index';

import {
  GraphHeader,
  GraphContainer,
  PerformanceTimeLineContainer,
  GraphNavigationWrapper,
  GraphToogleViewButton,
  LegendIcon,
  GraphAdditionalPanelCloseButton,
} from './graph.style';
import Legend from './Legend/Legend';
import { CircleIcon, SquareIcon } from './Legend/legend.style';
import { singleNode } from '../../helpers/graph/declarationHelper.mock';
import { COLOR_SUCCESS, COLOR_ERROR } from '../../helpers/graph/drawingHelper';

const store = {
  pageData: {
    1: {
      fragments: [
        {
          debug: {
            fragment: {
              id: '1',
            },
            graph: singleNode,
          },
        },
      ],
    },
  },
};

describe('Graph component', () => {
  const reactapp = document.createElement('div');
  document.body.appendChild(reactapp);

  const wrapper = mount(
    <Provider store={createStore(reducer, store)}>
      <GraphComponent fragmentId="1" tabId={1} />
    </Provider>,
    { attachTo: reactapp },
  );

  it('should render correctly without throwing an error', () => {
    expect(wrapper.find(GraphHeader).text()).toEqual('ID: 1');
    expect(wrapper.find(GraphContainer).getDOMNode()).toBeVisible();
    expect(wrapper.find(PerformanceTimeLineContainer).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(GraphNavigationWrapper).getDOMNode()).toBeVisible();
    expect(wrapper.find(GraphToogleViewButton).at(0).text()).toEqual('GRAPH VIEW');
    expect(wrapper.find(GraphToogleViewButton).at(1).text()).toEqual('PERFORMANCE VIEW');
  });

  it('should correctly switch between graph and timeline view', () => {
    expect(wrapper.find(PerformanceTimeLineContainer).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(GraphContainer).getDOMNode()).toBeVisible();

    wrapper.find(GraphToogleViewButton).at(1).simulate('click');

    expect(wrapper.find(PerformanceTimeLineContainer).getDOMNode()).toBeVisible();
    expect(wrapper.find(GraphContainer).getDOMNode()).not.toBeVisible();

    wrapper.find(GraphToogleViewButton).at(0).simulate('click');

    expect(wrapper.find(PerformanceTimeLineContainer).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(GraphContainer).getDOMNode()).toBeVisible();
  });

  it('should correctly display and hide Legend on click', () => {
    expect(wrapper.find(Legend).getDOMNode()).not.toBeVisible();
    wrapper.find(LegendIcon).at(0).simulate('click');

    expect(wrapper.find(Legend).getDOMNode()).toBeVisible();

    wrapper.find(GraphAdditionalPanelCloseButton).at(1).simulate('click');
    expect(wrapper.find(Legend).getDOMNode()).not.toBeVisible();
  });

  it('should correctly display and hide Legend on EnterPress', () => {
    expect(wrapper.find(Legend).getDOMNode()).not.toBeVisible();
    wrapper.find(LegendIcon).at(0).simulate('click');

    expect(wrapper.find(Legend).getDOMNode()).toBeVisible();

    wrapper.find(GraphAdditionalPanelCloseButton).at(1).simulate('keydown', { keyCode: 13 });
    expect(wrapper.find(Legend).getDOMNode()).not.toBeVisible();
  });

  it('should correctly change nodeInfo to nodeIcon', () => {
    const exampeNodeInfo = {
      set_1: {
        type: 'SINGLE',
        status: 'SUCCESS',
      },

      set_2: {
        type: 'COMPOSITE',
        status: 'ERROR',
      },
    };

    expect(shallow(nodeInfoToIcon(exampeNodeInfo.set_1)).contains(
      <SquareIcon color={COLOR_SUCCESS} />,
    )).toBe(true);

    expect(shallow(nodeInfoToIcon(exampeNodeInfo.set_2)).contains(
      <CircleIcon color={COLOR_ERROR} />,
    )).toBe(true);
  });
});
