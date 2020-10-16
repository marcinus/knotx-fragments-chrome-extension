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
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';
import SidePanel from './SidePanel';
import data from '../FragmentList/fragmentList.mock';
import { withReduxSettings } from '../../../../.storybook/storiesHelper';

const withReduxDecorator = withRedux(addons)(withReduxSettings({ pageData: data }));

export default {
  title: 'Logic Components | SidePanel',
  decorators: [withReduxDecorator],
};

// eslint-disable-next-line react/jsx-props-no-spreading
export const SidePanelStory = (args) => <SidePanel {...args} />;

SidePanelStory.story = {
  name: 'SidePanel',
};

SidePanelStory.args = {
  tabId: 777,
};
