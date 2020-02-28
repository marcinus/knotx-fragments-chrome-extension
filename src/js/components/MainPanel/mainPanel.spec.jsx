
import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import reducer from '../../state/reducers/index';
import MainPanel from './mainPanel';


Enzyme.configure({ adapter: new EnzymeAdapter() });

const store = {
  pageData: {
    1: {
      renderedGraph: null,
    },
  },
};

const getWrapper = () => mount(
  <Provider store={createStore(reducer, store)}>
    <MainPanel
      tabId={1}
    />
  </Provider>,
);

describe('A suite', () => {
  it('should render to static HTML', () => {
    const wrapper = getWrapper();
    expect(render(wrapper).text()).toEqual('Please Choose any fragment');
  });
});
