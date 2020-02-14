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

// CONSTANTS
export const PANEL_NAME = 'Knot.x';
export const status = {
  succes: 'succes',
  error: 'error',
};
export const ENTER_KEY_CODE = 13;

export const COLORS = {
  TEXT_COLOR: '#2c2c2c',
  BUTTON_BG_COLOR: '#c1c1c1',
  FRAGMENT_HIGHLIGHT: '#0056d827',
  BORDER_COLOR: '#adadad56',
  ODD_FRAGMENT_BG_COLOR: '#dcdcdc44',
  NODE_HIGHLIGHT: '#0e000034',
  ODD_NODE_BG_COLOR: '#54545414',
  DARK: {
    TEXT_COLOR: '#d3d3d3',
    BUTTON_BG_COLOR: '#6e6e6e',
    FRAGMENT_HIGHLIGHT: '#0026ff34',
    BORDER_COLOR: '#dcdcdc44',
    ODD_FRAGMENT_BG_COLOR: '#ffffff13',
    NODE_HIGHLIGHT: '#8fe3ff42',
    ODD_NODE_BG_COLOR: '#add8e60e',
  },
};

export const ARROW_DOWN = String.fromCharCode(8595);

// CONNECTIONS
export const chromeConnections = {
  KNOTX_DEVTOOL_CONNECTION: 'KNOTX_DEVTOOL_CONNECTION',
};

// CONNECTION ACTIONS
export const chromeActions = {
  GET_CURRENT_TAB_INFO: 'GET_CURRENT_TAB_INFO',
};

// MESSAGES
/* eslint-disable max-len */

export const errorMsgs = {
  setPageData: 'Knot.x devtool extension: Something gone wrong, or your page does not use Knot.x :( ',
};

export const succesMsgs = {
  setPageData: 'Knot.x devtool extension: Succesfully get fragments and page data. You can start using Knot.x extension',
};

/* eslint-enable max-len */
