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
import ReactDOM from 'react-dom';
import App from './apps/App';
import '../sass/style.scss';
import { knotxNodes } from './helpers/nodesHelper';

chrome.devtools.panels.create('knotx', null, 'index.html');
chrome.devtools.panels.elements.createSidebarPane('Knot.x Fragments',
  (sidebar) => {
    const updateElementProperties = () => {
      sidebar.setExpression(`( ${knotxNodes.toString()} )()`);
    };

    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
  });

ReactDOM.render(<App />, document.getElementById('root'));
