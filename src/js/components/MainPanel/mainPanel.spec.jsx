import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../state/reducers/index';
import MainPanel from './mainPanel';

const store = {
  pageData: {
    1: {
      renderedGraph: null,
    },
  },
};

describe('Main panel component', () => {
  it('should render message if fragment is not selected', () => {
    const wrapper = mount(
      <Provider store={createStore(reducer, store)}>
        <MainPanel
          tabId={1}
        />
      </Provider>,
    );
    expect(wrapper.text()).toEqual('Please choose any fragment');
  });
});
