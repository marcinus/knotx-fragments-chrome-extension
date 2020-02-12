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
