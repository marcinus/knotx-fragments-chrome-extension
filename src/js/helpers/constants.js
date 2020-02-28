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
  BUTTON_BG_COLOR: '#a5a5a5',
  FRAGMENT_HIGHLIGHT: '#0056d827',
  FRAGMENT_ACTIVE: '#5f9ea0',
  BORDER_COLOR: '#adadad56',
  ODD_FRAGMENT_BG_COLOR: '#dcdcdc44',
  NODE_HIGHLIGHT: '#0e000034',
  ODD_NODE_BG_COLOR: '#54545414',
  SIDE_PANEL_BG_COLOR: '#f5f5f5',
  BUTTON_HOVER: '#4c4c4c',
  SUCCESS: '#01a101',
  ERROR: '##ff0000',
  UNPROCESSED: '##a7a7a7',
  WARNING: '#ffbb00',
  EXPAND_NODE_LIST_BG: 'transparent',
  EXPAND_NODE_LIST_BG_HOVER: '#8cde9a47',
  MENU_TOGGLE_BUTTON: '#000',
  DARK: {
    TEXT_COLOR: '#fff',
    BUTTON_BG_COLOR: '#6e6e6e',
    FRAGMENT_HIGHLIGHT: '#0026ff34',
    FRAGMENT_ACTIVE: '#5f9ea0',
    BORDER_COLOR: '#dcdcdc44',
    ODD_FRAGMENT_BG_COLOR: '#ffffff13',
    NODE_HIGHLIGHT: '#8fe3ff42',
    ODD_NODE_BG_COLOR: '#add8e60e',
    SIDE_PANEL_BG_COLOR: '#3a3a3a',
    BUTTON_HOVER: '#ffffff42',
    EXPAND_NODE_LIST_BG_HOVER: '#8cde9a47',
    MENU_TOGGLE_BUTTON: '#fff',
  },
};

export const ARROW_DOWN = String.fromCharCode(8595);
export const ARROW_UP = String.fromCharCode(8593);
export const CROSS = String.fromCharCode(10007);
export const HAMBURGER = String.fromCharCode(9776);
export const PAGE_BREAK = 700;

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
export const succesMsgs = {
  setPageData: 'Knot.x devtool extension: Succesfully get fragments and page data. You can start using Knot.x extension',
};

/* eslint-enable max-len */
