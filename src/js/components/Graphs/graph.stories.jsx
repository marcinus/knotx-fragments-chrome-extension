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
import 'vis-timeline/dist/vis-timeline-graph2d.min.css';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';
import Graph from './Graph';
import { compositeNodeWithTransitions } from '../../helpers/graph/declarationHelper.mock';
import { withReduxSettings } from '../../../../.storybook/storiesHelper';

const state = {
  pageData: {
    1: {
      fragments: [
        {
          debug: {
            fragment: {
              id: '1',
            },
            graph: compositeNodeWithTransitions,
          },
        },
      ],
    },
  },
};

const withReduxDecorator = withRedux(addons)(withReduxSettings(state));

export default {
  title: 'Logic Components | MainPanel.Graph',
  decorators: [withReduxDecorator],
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const GraphStory = (args) => <Graph {...args} />;

GraphStory.story = {
  name: 'Graph',
};

GraphStory.args = {
  tabId: 1,
  fragmentId: '1',
};
