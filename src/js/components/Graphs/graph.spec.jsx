import React from 'react';
import { mount, shallow } from 'enzyme';
import GraphComponent from './graph';
import { nodeInfoToIcon } from './graphHelper';

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

describe('Graph component', () => {
  const reactapp = document.createElement('div');
  document.body.appendChild(reactapp);

  const wrapper = mount(
    <GraphComponent fragmentId="1" graphJson={singleNode} />,
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

  it('should correctly display Legend', () => {
    expect(wrapper.find(Legend).getDOMNode()).not.toBeVisible();
    wrapper.find(LegendIcon).at(0).simulate('click');

    expect(wrapper.find(Legend).getDOMNode()).toBeVisible();

    wrapper.find(GraphAdditionalPanelCloseButton).at(1).simulate('click');
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
