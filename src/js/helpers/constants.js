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
export const ICONS = {
  HTTP: '\ue90d',
  GET: '\ue90c',
  POST: '\ue90f',
  PUT: '\ue910',
  DELETE: '\ue90b',
  CACHE: '\ue901',
  PAYLOAD: '\ue90e',
};

export const ENTER_KEY_CODE = 13;
export const PAGE_BREAK = 1024;

// CONNECTIONS
export const chromeConnections = {
  KNOTX_DEVTOOL_CONNECTION: 'KNOTX_DEVTOOL_CONNECTION',
};

// CONNECTION ACTIONS
export const chromeActions = {
  GET_CURRENT_TAB_INFO: 'GET_CURRENT_TAB_INFO',
};

// STATIC ELEMENTS
/* eslint-disable max-len */
export const succesLoadExtensionMsgs = 'Knot.x devtool extension: Succesfully get fragments and page data. You can start using Knot.x extension';
export const FRAGMENT_LIST_HEADER = 'List of fragments';
export const fragmentListTablesHeaders = {
  ID: 'ID',
  TYPE: 'TYPE',
  TIME: 'TIME',
};

export const graphNavigation = {
  GRAPH_VIEW: 'GRAPH VIEW',
  PERFORMANCE_VIEW: 'PERFORMANCE VIEW',
};

export const NODE_INFO_PANEL_HEADER = 'Node info';
export const LEGEND_PANEL_HEADER = 'Legend';
export const NO_KNOTX_PAGE_MSG = 'Sorry, your page does not use Knot.x, use Knot.x version older then 2.2 or use Knot.x without debug mode (see <a href="https://github.com/Knotx/knotx-fragments/tree/master/handler/consumer/html#how-to-start" target="_blank"> doc </a>).';
export const FRAGMENTS_PERFORMANCE = 'Fragments performance';
/* eslint-enable max-len */
