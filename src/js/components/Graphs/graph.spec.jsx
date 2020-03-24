import React from 'react';
import { mount } from 'enzyme';
import GraphComponent from './graph';

import {
  GraphHeader,
  Graph,
  PerformanceTimeLine,
  GraphNavigationWrapper,
  GraphToogleViewButton,
} from './graph.style';
import RightNavBar from '../Navbars/rightNavbar/navbar';
import { singleNode } from '../../helpers/graph/declarationHelper.mock';

describe('Graph component', () => {
  const reactapp = document.createElement('div');
  document.body.appendChild(reactapp);

  const wrapper = mount(
    <>
      <RightNavBar />
      <GraphComponent fragmentId="1" graphJson={singleNode} />
    </>,
    { attachTo: reactapp },
  );

  it('should render correctly without throwing an error', () => {
    expect(wrapper.find(GraphHeader).text()).toEqual('ID: 1');
    expect(wrapper.find(Graph).getDOMNode()).toBeVisible();
    expect(wrapper.find(PerformanceTimeLine).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(GraphNavigationWrapper).getDOMNode()).toBeVisible();
    expect(wrapper.find(GraphToogleViewButton).at(0).text()).toEqual('PERFORMANCE VIEW');
    expect(wrapper.find(GraphToogleViewButton).at(1).text()).toEqual('GRAPH VIEW');
  });

  it('should correctly switch between graph and timeline view', () => {
    expect(wrapper.find(PerformanceTimeLine).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(Graph).getDOMNode()).toBeVisible();

    wrapper.find(GraphToogleViewButton).at(0).simulate('click');

    expect(wrapper.find(PerformanceTimeLine).getDOMNode()).toBeVisible();
    expect(wrapper.find(Graph).getDOMNode()).not.toBeVisible();

    wrapper.find(GraphToogleViewButton).at(1).simulate('click');

    expect(wrapper.find(PerformanceTimeLine).getDOMNode()).not.toBeVisible();
    expect(wrapper.find(Graph).getDOMNode()).toBeVisible();
  });
});
