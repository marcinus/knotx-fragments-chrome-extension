import React from 'react';
import { mount } from 'enzyme';
import Legend from './Legend';
import LegendSection from './LegendSection';
import { legendArrays } from './legendHelper';
import {
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
} from './legend.style';

describe('Legend section component', () => {
  const wrapper = mount(<Legend />);
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
