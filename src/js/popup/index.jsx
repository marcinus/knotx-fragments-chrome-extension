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
import App from './popup';
import { chromeConnections, chromeActions } from '../helpers/constants';
import { GlobalStyle } from '../styling/globalStyle';

const port = chrome.runtime.connect({ name: chromeConnections.KNOTX_DEVTOOL_CONNECTION });

port.postMessage({ type: chromeActions.GET_CURRENT_TAB_INFO });
port.onMessage.addListener(({ id }) => {
  ReactDOM.render(
    <>
      <App tabId={id} />
      <GlobalStyle />
    </>,
    document.getElementById('popup'),
  );
  port.disconnect();
});
