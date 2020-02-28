import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import GraphComponent from './graph';
import {
  GraphContainer,
  Graph,
} from './graph.style';


Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<GraphComponent />).contains(
      <GraphContainer className="graphContainer">
        <Graph className="graph" />
      </GraphContainer>,
    )).toBe(true);
  });

  // TODO https://github.com/Knotx/knotx-fragments-chrome-extension/issues/35
  // it('should render  throwing an error', () => {
  //   expect(mount(<GraphComponent graphJson={singleNode} />).find('.vis-network')).toHaveLength(1);
  // });
});
