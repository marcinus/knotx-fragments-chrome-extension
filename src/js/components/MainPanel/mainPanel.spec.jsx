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
import reducer from '../../state/reducers/index';
import { singleNode } from '../../helpers/graph/declarationHelper.mock';
import MainPanel from './MainPanel';
import Graph from '../Graphs/Graph';

const store = (renderedGraph) => ({
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
        {
          debug: {
            fragment: {
              id: '2',
            },
            graph: singleNode,
          },
        },
      ],
      renderedGraph,
    },
  },
});

describe('Main panel component', () => {
  const wrapper = (renderedGraph) => mount(
    <Provider store={createStore(reducer, store(renderedGraph))}>
      <MainPanel
        tabId={1}
      />
    </Provider>,
  );
  it('should render first fragments graph if graph is not selected', () => {
    expect(wrapper(null).find(Graph)).toHaveLength(1);
    expect(
      wrapper(null).find(Graph)
        .first()
        .prop('fragmentId'),
    ).toEqual('1');
  });

  it('should render selected fragment graph.', () => {
    expect(wrapper('2').find(Graph)).toHaveLength(1);
    expect(
      wrapper('2').find(Graph)
        .first()
        .prop('fragmentId'),
    ).toEqual('2');
  });
});
