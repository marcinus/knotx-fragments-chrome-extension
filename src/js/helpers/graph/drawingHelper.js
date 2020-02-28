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

import { Network } from 'vis-network';

export const COLOR_VIRTUAL = '#FFFFFF';
export const COLOR_UNPROCESSED = '#F5F5F5';
export const COLOR_SUCCESS = '#00CC00';
export const COLOR_ERROR = '#FF0000';
export const COLOR_MISSING = '#FFFF00';
export const COLOR_OTHER = '#0080FF';

export const COLOR_DEFAULT_NODE_FONT = '#000000';
export const COLOR_UNPROCESSED_NODE_FONT = '#A0A0A0';
export const COLOR_DEFAULT_EDGE = '#000000';
export const COLOR_UNPROCESSED_EDGE = '#606060';

const defaultVirtualNode = {
  shape: 'dot',
  size: 10,
  color: {
    background: COLOR_VIRTUAL,
  },
};

const groups = {
  virtual: defaultVirtualNode,
  virtual_unprocessed: {
    ...defaultVirtualNode,
    color: {
      background: COLOR_UNPROCESSED,
    },
  },
  virtual_error: {
    ...defaultVirtualNode,
    color: {
      background: COLOR_ERROR,
    },
  },
  virtual_success: {
    ...defaultVirtualNode,
    color: {
      background: COLOR_SUCCESS,
    },
  },
  success: {
    color: {
      background: COLOR_SUCCESS,
    },
  },
  error: {
    color: {
      background: COLOR_ERROR,
    },
  },
  unprocessed: {
    color: {
      background: COLOR_UNPROCESSED,
    },
    font: {
      color: COLOR_UNPROCESSED_NODE_FONT,
    },
  },
  missing: {
    color: {
      background: COLOR_MISSING,
    },
  },
  other: {
    color: {
      background: COLOR_OTHER,
    },
  },
};

export const defaultGraphConfiguration = {
  groups: {
    ...groups,
  },
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 1,
    shape: 'box',
    font: {
      color: COLOR_DEFAULT_NODE_FONT,
    },
    color: {
      border: COLOR_DEFAULT_EDGE,
    },
  },
  edges: {
    color: COLOR_DEFAULT_EDGE,
    font: {
      background: 'white',
    },
  },
  layout: {
    hierarchical: {
      levelSeparation: 80,
      direction: 'UD',
      nodeSpacing: 200,
      sortMethod: 'directed',
      blockShifting: false,
      shakeTowards: 'roots',
    },
  },
  physics: false,
};

export const drawGraph = (graph, element, options = defaultGraphConfiguration) => new Network(element, graph, options);
