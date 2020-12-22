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
import DocPage from './DocPage';
import reducer from '../../state/reducers/index';
import {
  Container,
  CloseButon,
  Wrapper,
  // DocLink,
} from './docPage.style';

const store = {
  pageData: {
    1: {
      docPageLink: '`https://api.github.com/repos/Knotx/knotx-fragments-chrome-extension/contents/README.md',
    },
  },
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(result),
}));

const README_MOCK = `# Knot.x Fragments Chrome Extension
Extends the Developer Tools, adding a sidebar that displays [Fragments](https://github.com/Knotx/knotx-fragments)
data associated with the selected DOM element.`;


describe('DocPage component', () => {
  const wrapper = mount(
    <Provider store={createStore(reducer, store)}>
      <DocPage tabId={1} themeName="DEFAULT" />
    </Provider>,
  );

  it('docPageData visibility is depends from docPageLink value.', () => {
    expect(wrapper.find(Wrapper).getDOMNode()).toBeVisible();
    wrapper.find(CloseButon).at(0).simulate('click');
    expect(wrapper.find(Wrapper).getDOMNode()).not.toBeVisible();
  });
});
